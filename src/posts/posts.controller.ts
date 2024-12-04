import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CreatePostDTO } from 'src/DTO/request.dto/CreatePostDTO';
import { EditPostDTO } from 'src/DTO/request.dto/EditPostDTO';
import { UsersService } from 'src/users/users.service';
import { IsAuthorGuard } from 'src/auth/Guards/is-author.guard';
@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
  ) {}

  //   @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllPosts(
    @Query('username') username?: string,
    @Query('tags') tags?: string | string[],  ) {
      if (typeof tags === 'string') {
        tags = tags.split(',').map(tag => tag.trim());  
      }
    return this.postService.findAll(username, tags);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Get('/my')
  getMyPosts(@Request() req) {
    const userId = req.user.id;
    return this.postService.findMy(userId);
  }

  @Get('/get')
  getPost(title: string) {
    return this.postService.findOne(title);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async postCreate(@Request() req, @Body() body: CreatePostDTO) {
    const userId = req.user.id;
    // console.log(userId);
    return this.postService.create(userId, body);
  }
  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Patch('/edit')
  async editPost(@Request() req, @Body() body: EditPostDTO) {
    // console.log(postId)
    const userId = req.user.id;
    console.log(userId);

    return this.postService.editPost(userId, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Delete('/delete')
  deletePost(@Request() req, @Body() body: { title: string }) {
    const userId = req.user.id;
    return this.postService.delete(userId, body.title);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/filter')
  filterPosts(@Body() body: { tag: string }) {
    return this.postService.filterByTags(body);
  }
  // @UseGuards(JwtAuthGuard)
  // @Patch('/edit/tag')
  // editTag (@Request() req, body) {}
}
