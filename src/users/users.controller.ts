import { Controller, Get, Request, Body, UseGuards, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';
import { EditDTO } from 'src/DTO/request.dto/EditDTO';

import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    findAll(){
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/unique')
    findOne(@Body() body: {username: string}) {
        return this.usersService.findOne(body.username);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put('/edit')
    async edit( @Request() req, @Body() body: EditDTO) {
      const userId = req.user.id; 
      return await this.usersService.update(userId, body)
    }
}
