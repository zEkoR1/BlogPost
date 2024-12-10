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
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDTO } from './create-post.dto';
import { EditPostDTO } from './edit-post.dto';
import { IsAuthorGuard } from '../auth/guards/is-author.guard';
import { FilterPostQueryDTO } from './filter-post.dto';
import { UuidValidationPipe } from '../pipes/uuid.validation.pipr';
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('/:id')
  getPost(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getPosts(@Query() query: FilterPostQueryDTO) {

    return this.postService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async postCreate(@Request() req, @Body() body: CreatePostDTO) {
    const userId = req.user.id;

    return this.postService.create(userId, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Patch('/:id')
  async edit(@Body() body: EditPostDTO, @Param('id',  new ParseUUIDPipe()) id: string) {
    console.log(`Received ID: ${id}`);
    
    return this.postService.edit(id, body);
  }

  @UseGuards(JwtAuthGuard, IsAuthorGuard)
  @Delete('/:id')
  deletePost(@Param('id',  new ParseUUIDPipe()) id: string) {

    return this.postService.delete(id);
  }
}
