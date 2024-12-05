import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthController } from './auth/auth.controller';
import { CommentsController } from './comments/comments.controller';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, PostsModule, CommentsModule, TagsModule],
  controllers: [AppController, PostsController, AuthController, CommentsController, TagsController],
  providers: [],
})
export class AppModule {}
