import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePostDTO } from 'src/DTO/request.dto/CreatePostDTO';
import { EditPostDTO } from 'src/DTO/request.dto/EditPostDTO';
import { isAuthorDTO } from 'src/DTO/request.dto/IsAuthorDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagsService } from 'src/tags/tags.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private tagService : TagsService
  ) {}

  async findOne(title: string) {
    const post = this.prisma.post.findFirst({
      where: { title: title },
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

    return  this.prisma.post.findMany({
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
    const createdTags = await this.tagService.create({tags})

    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: userId },
        },
        tags: { 
          connect: createdTags.map( (tag) => ({id: tag.id}))
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async findMy(userId: string) {

    const posts = await this.prisma.post.findMany({
      where: { authorId: userId },
    });
    if (!posts)
      throw new BadRequestException('This user doesnt have any posts yet');

    return posts;
  }

  async editPost(userId: string, body: EditPostDTO) {

    const post = await this.findOne(body.title);
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
      where: { id: post.id },
      data: newData,
    });
  }

  async delete(userId: string, title: string) {

    const post = await this.findOne(title);
    const deletedPost = await this.prisma.post.delete({
      where: { id: post.id },
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
