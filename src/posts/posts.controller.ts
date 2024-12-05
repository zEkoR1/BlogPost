import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  BadRequestException,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';
import { CreatePostDTO } from '../DTO/request.dto/CreatePostDTO';
import { EditPostDTO } from '../DTO/request.dto/EditPostDTO';
import { IsAuthorGuard } from '../auth/Guards/is-author.guard';
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log(`Received ID: ${id}`);
    return this.postService.findOne(id);
  }
  
  // @UseGuards(JwtAuthGuard)
  // @Get('/posts')
  // async getPosts(@Query('filter')filter?: string) {
  //   let parsedFilter: { username?: string; tags?: string[] } = {};

  //   if (filter) {
  //     try {
  //       parsedFilter = JSON.parse(filter);
  //     } catch (error) {
  //       throw new BadRequestException('Invalid filter format');
  //     }
  //   }

  //   const { username, tags } = parsedFilter;
  //   return this.postService.findAll(username, tags);
  // }
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getPosts(
    @Query('username') username?: string,
    @Query('tags') tags?: string, 
  ) {
    const tagsArray = tags?.split(',').map(tag => tag.trim());

    return this.postService.findAll(username, tagsArray);
  }
  
 

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async postCreate(@Request() req, @Body() body: CreatePostDTO) {
    const userId = req.user.id;

    return this.postService.create(userId, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Patch('/:id')
  async edit(@Body() body: EditPostDTO, @Param('id') id: string) {
    console.log(`Received ID: ${id}`);
    return this.postService.edit(id, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Delete('/:id')
  deletePost(@Param('id') id: string) {

    return this.postService.delete(id);
  }
}
