import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { ExecutionContext } from '@nestjs/common';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('TagsController', () => {
  let controller: TagsController;
  let tagsService: TagsService;

  beforeEach(async () => {
    const mockAuthGuard ={
      canActivate: jest.fn((context: ExecutionContext) => true)
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: {
            getTags: jest.fn().mockResolvedValue(['tag 1']),
            find: jest.fn().mockResolvedValue(['tag 1'])
          }
        }
      ]
    })
    .overrideGuard(JwtAuthGuard)
    .useValue(mockAuthGuard)
    .compile();
    
    controller = module.get <TagsController> (TagsController)
    tagsService = module.get <TagsService> (TagsService)
  });


  it('should be defined', () =>{
    expect(controller).toBeDefined();
  })

  it ('should find tags', async () =>{
    const result = await controller.getTags({tags : ["tag 1"]});
    expect(result).toEqual(['tag 1'])
  })
});
