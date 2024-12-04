import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
@Module({
  providers: [PostsService],
  imports: [PrismaModule, UsersModule, TagsModule],
  exports:[PostsService]

})
export class PostsModule {}
