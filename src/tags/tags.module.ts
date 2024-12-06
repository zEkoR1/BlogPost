import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
    providers: [TagsService],
    imports: [PrismaModule],
    exports: [TagsService],
    controllers: [TagsController]
})
export class TagsModule {
    
}
