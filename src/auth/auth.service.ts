import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()


export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async createUser(username: string, password: string) {
    const existingUser = await this.userService.findOne(username);
    // console.log(existingUser)

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
    // console.log(username, password)
    // console.log(existingUser.username, existingUser.password)

    if (!existingUser)
      throw new UnauthorizedException('There is no user with such username');
    const passValid = await bcrypt.compare(password, existingUser.password);
    if (!passValid) throw new UnauthorizedException('Wrong password');
    const { password: _, ...userWithoutPassword } = existingUser;
    return userWithoutPassword;
  }
}
//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.userService.findOne(username);
//     if (
//       user &&
//       user.username === username &&
//       bcrypt.compare(pass, user.password)
//     ) {
//       const { password, ...result } = user;

//       return result;
//     }
//     throw new UnauthorizedException('Wrong username or password');
//   }
//   async login(user: any) {
//     if (this.validateUser(user.username, user.password)) {
//       const payload = { username: user.username, sub: user.userId };
//       return { access_token: this.jwtService.sign(payload) };
//     }
//   }

//   async editUser(userId: string, user: Partial<User>) {
//     const updatedUser = await this.userService.update(userId, user);
//     return updatedUser;
//   }
