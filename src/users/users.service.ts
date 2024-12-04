import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EditDTO } from 'src/DTO/request.dto/EditDTO';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string) {
    // console.log(username)
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  async create(username: string, password: string) {
    return this.prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
  }
  
  // async validateCredentials (username: string, password: string){
  //     const existingUser = await this.findOne(username)
  //     // console.log(username, password)
  //     // console.log(existingUser.username, existingUser.password)

  //     if (!existingUser) throw new UnauthorizedException("There is no user with such username")
  //     const passValid = await bcrypt.compare(password, existingUser.password)
  //     if (!passValid) throw new UnauthorizedException("Wrong password")
  //     const {password: _, ...userWithoutPassword} = existingUser;
  //     return userWithoutPassword;
  // }
  async update(id: string, body: EditDTO) {
    const updateData: {username?:string, password?:string} = {}
    if (body.username) updateData.username = body.username;
    if (body.password) updateData.password =  await bcrypt.hash(body.password, 10);
    return  this.prisma.user.update({
      where: { id: id },
      data: updateData,
    });

  }



}
