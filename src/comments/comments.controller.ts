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
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentDTO } from './comment.dto';
import { IsAuthorGuard } from '../auth/guards/is-author.guard';

@Controller('/posts/:postID/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(
    @Param('postID', new ParseUUIDPipe()) postID: string,
    @Request() req,
    @Body() body: CommentDTO,
  ) {
    const userID = req.user.id;
    this.commentService.create(userID, postID, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Patch('/:id')
  edit(
    @Param('postID', new ParseUUIDPipe()) postID: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: { changes: string },
  ) {

    return this.commentService.edit(postID, id, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Delete('/:id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {

    this.commentService.delete(id);
  }
}
