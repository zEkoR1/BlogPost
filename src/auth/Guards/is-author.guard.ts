import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class IsAuthorGuard implements CanActivate {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Получаем userID из запроса
    const userID = request.user?.id;
    if (!userID) {
      throw new BadRequestException('User ID is missing from the request');
    }

    // Извлекаем параметры маршрута
    const postId = request.params.postId || request.params.id; // Для постов и комментариев
    const commentId = request.params.commentId || request.body.commentId;

    // Логика для проверки поста
    if (postId && !commentId) {
      const post = await this.postsService.findOne(postId);

      if (!post) {
        throw new BadRequestException('Post not found');
      }

      if (post.authorId !== userID) {
        throw new ForbiddenException('You are not the author of this post');
      }

      return true;
    }

    // Логика для проверки комментария
    if (postId && commentId) {
      const comment = await this.commentsService.findOne(postId, commentId);

      if (!comment) {
        throw new BadRequestException('Comment not found');
      }

      if (comment.authorId !== userID) {
        throw new ForbiddenException('You are not the author of this comment');
      }

      return true;
    }

    // Если параметры не соответствуют ожиданиям
    throw new BadRequestException('Invalid request: post ID or comment ID is required');
  }
}
