import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentDTO } from '../DTO/request.dto/CommentDTO';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private postService: PostsService,
    private userService: UsersService,
  ) {}

  async findOne(postID: string,  id: string) {

    const com = await this.prismaService.comment.findFirst({
      where: { id: id, postId: postID },
    });

    return com;
  }


  async create(userId: string, postID: string, body: CommentDTO) {
    await this.prismaService.comment.create({
      data: {
        post: { connect: { id: postID } },
        content: body.comment,
        author: {
          connect: { id: userId },
        },
      },
    });
  }

  async edit(id: string, postID: string,  body) {
    
    return this.prismaService.comment.update({
      where: { id: id },
      data: { content: body.changes },
    });
  }

  async delete(id: string) {

    return this.prismaService.comment.delete({
      where: { id: id },
    });
  }
}
