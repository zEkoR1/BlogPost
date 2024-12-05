import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePostDTO } from '../DTO/request.dto/CreatePostDTO';
import { EditPostDTO } from '../DTO/request.dto/EditPostDTO';
import { validate as isUUID } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private tagService: TagsService,
  ) {}

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }    const post = await this.prisma.post.findUnique({
      where: { id: id },
    });
    if (!post) throw new BadRequestException('There is no post found');

    return post;
  }

  async findAll(username?: string, tags?: string[]) {
    let userID;
    if (username) {
      const user = await this.userService.findOne(username);
      if (user) {
        userID = user.id;
      }
    }
    const where: any = {};
    if (userID) where.authorId = userID;
    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          name: {
            in: tags,
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

  async filterByTags(body: { tag: string }) {
    const posts = await this.prisma.post.findMany({
      select: {
        title: true,
        author: true,
        createdAt: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
      where: {
        tags: {
          some: {
            name: body.tag,
          },
        },
      },
    });

    if (!posts.length)
      throw new BadRequestException('There is no any post with this Tag');

    return posts;
  }
}
