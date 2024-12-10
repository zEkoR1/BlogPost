import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, PostsModule, CommentsModule, TagsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
