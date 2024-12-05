import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Put,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';
import { CommentDTO } from '../DTO/request.dto/CommentDTO';
import { IsAuthorGuard } from '../auth/Guards/is-author.guard';

@Controller('/posts/:postID/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@Param() postID: string, @Request() req, @Body() body: CommentDTO) {
    const userID = req.user.id;
    this.commentService.create(userID, postID, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Patch('/:id')
  editComment(
    @Param() id: string, postID: string,
    @Body() body: {changes: string },
  ) {

    return this.commentService.edit(postID, id, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Delete('/:id')
  deleteComment(
    @Param() id: string,
  ) {
    this.commentService.delete(id);
  }
}
