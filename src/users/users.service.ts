import {
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EditDTO } from './edit-user.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {

    return this.prisma.user.findMany();
  }

  async findOne(userID: string) {

    return this.prisma.user.findUnique({
      where: { id: userID },
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

  async update(id: string, editUserDto: EditDTO) {
    const updateData: { username?: string; password?: string } = {};

    if (editUserDto.username) {
      updateData.username = editUserDto.username;
    }
    if (editUserDto.password) {
      updateData.password = await bcrypt.hash(editUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id: id },
      data: updateData,
    });
  }
}
