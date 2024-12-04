import { Controller, Post, UseGuards, Body, Request,Put , Delete, Patch} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CommentDTO } from 'src/DTO/request.dto/CommentDTO';
import { IsAuthorGuard } from 'src/auth/Guards/is-author.guard';

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}
    @UseGuards(JwtAuthGuard)
    @Post('/')
    leaveComment(@Request() req, @Body() body:CommentDTO){
        const userID = req.user.id
        this.commentService.leaveComment(userID, body)
    }
    @UseGuards(JwtAuthGuard, IsAuthorGuard)
    @Patch('/edit')
    editComment(@Request() req, @Body() body: {title:string, comment: string, changes: string }){
        const userID = req.user.id
        return this.commentService.EditComment(userID, body)
    }
    @UseGuards(JwtAuthGuard, IsAuthorGuard)
    @Delete('/delete')
    deleteComment(@Request() req, @Body() body: {title:string, comment: string}){
        const userID = req.user.id
        this.commentService.deleteComment(userID, body)
    }
}
