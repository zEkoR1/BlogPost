import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
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
    const userID = request.user?.id;

    if (!userID) {
      throw new BadRequestException('User ID is missing from the request');
    }

    const postTitle = request.params.title || request.body.title;
    const commentContent = request.params.comment || request.body.comment;

    if (postTitle && !commentContent) {
      const post = await this.postsService.findOne(postTitle);

      if (!post) {
        throw new BadRequestException('Post not found');
      }

      if (post.authorId !== userID) {
        throw new BadRequestException('You are not the author of this post');
      }

      return true;
    }

    if (postTitle && commentContent) {
      const comment = await this.commentsService.findOne(postTitle, commentContent);

      if (!comment) {
        throw new BadRequestException('Comment not found');
      }

      if (comment.authorId !== userID) {
        throw new BadRequestException('You are not the author of this comment');
      }

      return true;
    }

    throw new BadRequestException('Invalid request: post title or comment content is required');
  }
}
