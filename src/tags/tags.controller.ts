import { Body, Controller, Patch, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private tagService: TagsService){}

    @Get('/')
    getTags(@Body () body: {tags: string[]}){

        return this.tagService.find(body)
    }


}
