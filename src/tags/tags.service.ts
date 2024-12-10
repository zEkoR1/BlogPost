import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async find(body: {tags: string[]}) {

    const tags = await this.prismaService.tag.findMany({
      where: {name : 
        {in : body.tags}
      }
    })
    console.log(tags)

    return tags;
    
  }

  async create(body: {tags: string[] }) {

    const tagPromises  =  body.tags.map((tag) => {
      return this.prismaService.tag.upsert({
        where: {name:tag},
        update: {},
        create: {name: tag},
      })
    });
    const tags = await Promise.all(tagPromises)

    return tags
    }
}
