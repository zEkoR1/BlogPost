import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/Guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/Guards/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { EditDTO } from './DTO/request.dto/EditDTO';
import { CommentDTO } from './DTO/request.dto/CommentDTO';
// import { CommentsService } from './comments/comments.service';
@Controller()
export class AppController {
  constructor(
    // private commentService: CommentsService
  ) {}

  // @Post('auth/register')
  // async register(@Request() req){
  //   return this.authService.registerUser(req.body)
  // }
  // @UseGuards(JwtAuthGuard)
  // @Put('edit')
  // async edit(@Request() req){
  //   return this.authService.editUser(req.user.userId, req.body)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('/')
  // leaveComment(@Request() req, @Body() body:CommentDTO){
  //     const userID = req.user.id
  //     this.commentService.leaveComment(userID, body)
  // }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
