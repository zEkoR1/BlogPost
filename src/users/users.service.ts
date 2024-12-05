import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EditDTO } from '../DTO/request.dto/EditDTO';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {

    return this.prisma.user.findMany();
  }

  async findOne(username: string) {
    
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
