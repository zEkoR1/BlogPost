import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()


export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async createUser(username: string, password: string) {
    const existingUser = await this.userService.findOne(username);

    if (existingUser) {
      console.log(existingUser);
      throw new ConflictException('User with this username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create(username, hashedPassword);
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      message: 'User successfully created',
      user: userWithoutPassword,
    };
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username };
    
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateCredentials(username: string, password: string) {
    const existingUser = await this.userService.findOne(username);


    if (!existingUser)
      throw new UnauthorizedException('There is no user with such username');
    const passValid = await bcrypt.compare(password, existingUser.password);
    if (!passValid) throw new UnauthorizedException('Wrong password');
    const { password: _, ...userWithoutPassword } = existingUser;
    
    return userWithoutPassword;
  }
}
