import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsService } from './tags.service';

@Module({
    providers: [TagsService],
    imports: [PrismaModule],
    exports: [TagsService]
})
export class TagsModule {
    
}
