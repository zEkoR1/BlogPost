import { Controller, Get, Request, Body, UseGuards, Put, Patch, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditDTO } from './edit-user.dto';
import { UsersService } from './users.service';
import { UuidValidationPipe } from '../pipes/uuid.validation.pipr';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    findAll(){

        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    findOne(@Param ('id', UuidValidationPipe) userID: string) {

        return this.usersService.findOne(userID);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    edit( @Param('id', UuidValidationPipe) userID: string,  @Body() editDto: EditDTO) {

      return  this.usersService.update(userID, editDto)
    }
}
