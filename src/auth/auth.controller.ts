import { Controller, Post, Body , UseGuards, Put, Request} from '@nestjs/common';
import { LocalAuthGuard } from './Guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private userService: UsersService) {}
    
    @Post('/register')
    async register(@Body() body: { username: string; password: string }) {
      
      return this.authService.createUser(body.username, body.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {

      return this.authService.login(req.user);
    }

    @Post('/logout')
    async logout(@Request() req) {

      return req.logout;
    }
   


}
