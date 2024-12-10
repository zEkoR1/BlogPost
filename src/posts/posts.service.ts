import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePostDTO } from './create-post.dto';
import { EditPostDTO } from './edit-post.dto';
import { validate as isUUID } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';
import { FilterPostQueryDTO } from './filter-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private tagService: TagsService,
  ) {}

  async findOne(id: string) {  
     const post = await this.prisma.post.findUnique({
      where: { id: id },
    });
    if (!post) throw new BadRequestException('There is no post found');

    return post;
  }

  async findAll(query: FilterPostQueryDTO) {
    const {username, tags} = query
    const tagsArray = tags?.split(',').map(tag => tag.trim());
    let userID;
    if (username) {
      const user = await this.userService.findOne(username);
      if (user) {
        userID = user.id;
      }
    }
    const where: any = {};
    if (userID) where.authorId = userID;
    if (tagsArray && tagsArray.length > 0) {
      where.tags = {
        some: {
          name: {
            in: tagsArray,
          },
        },
      };
    }
  

    return this.prisma.post.findMany({
      where,
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async create(userId: string, body: CreatePostDTO) {
    const { title, content, tags } = body;
    if (!body.title || !body.content) {
      throw new BadRequestException('Title and content are required');
    }
    const createdTags = await this.tagService.create({ tags });

    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: userId },
        },
        tags: {
          connect: createdTags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async edit(id: string, body: EditPostDTO) {
    const { tags } = body;
    const newData: {
      title?: string;
      content?: string;
      tags?: {
        connect: { id: string }[];
      };
    } = {};

    if (body.title) newData.title = body.title;
    if (body.content) newData.content = body.content;
    if (body.tags) {
      const createdTags = await this.tagService.create({ tags });
      newData.tags = {
        connect: createdTags.map((tag) => ({ id: tag.id })),
      };
    }

    return this.prisma.post.update({
      where: { id: id },
      data: newData,
    });
  }

  async delete(id: string) {
    const deletedPost = await this.prisma.post.delete({
      where: { id: id },
    });

    return {
      message: 'Post was successfuly deleted ',
      deletedPost,
    };
  }

}
