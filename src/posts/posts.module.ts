import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PostsController } from './posts.controller';
import { CommentsService } from '../comments/comments.service';
@Module({
  providers: [PostsService, CommentsService],
  controllers: [PostsController],
  imports: [PrismaModule, UsersModule, TagsModule],
  exports:[PostsService]

})
export class PostsModule {}
