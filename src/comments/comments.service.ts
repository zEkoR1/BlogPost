import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentDTO } from '../DTO/request.dto/CommentDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private postService: PostsService,
    private userService: UsersService,
  ) {}

  async findOne(postTitle: string, comment: string) {

    const post = await this.postService.findOne(postTitle);
    const com = await this.prismaService.comment.findFirst({
      where: { content: comment, postId: post.id },
    });

    return com;
  }


  async leaveComment(userId: string, body: CommentDTO) {
    const post = await this.postService.findOne(body.title);
    await this.prismaService.comment.create({
      data: {
        post: { connect: { id: post.id } },
        content: body.comment,
        author: {
          connect: { id: userId },
        },
      },
    });
  }

  async EditComment(userId: string, body) {
    const comment = await this.findOne(body.title, body.comment);
    
    return this.prismaService.comment.update({
      where: { id: comment.id },
      data: { content: body.changes },
    });
  }

  async deleteComment(userID, body) {
    const post = await this.userService.findOne(body.title);

    const comment = await this.prismaService.comment.findFirst({
      where: { content: body.comment, postId: post.id },
    });

    return this.prismaService.comment.delete({
      where: { id: comment.id },
    });
  }
}
