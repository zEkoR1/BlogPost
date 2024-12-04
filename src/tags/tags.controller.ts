import { Body, Controller, Patch, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CreateTagDTO } from 'src/DTO/request.dto/CreateTagDTO';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private tagService: TagsService){}
    // @UseGuards(JwtAuthGuard)
    // @Patch('/create')
    // async addTag(@Request() req, @Body() body: CreateTagDTO){
    //     const userID = req.user.id;
    //     this.tagService.addTag(userID, body)
    // }
    @Get('/')
    getTags(@Body () body: {tags: string[]}){
        return this.tagService.find(body)
    }


}
