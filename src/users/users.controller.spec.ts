import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';
import { EditDTO } from '../DTO/request.dto/EditDTO';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';



  describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
      const mockAuthGuard = {
        canActivate: jest.fn((context: ExecutionContext) => true),
      };

      const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: {
              findAll: jest.fn().mockResolvedValue(['user1', 'user2']),
              findOne: jest.fn().mockResolvedValue('user1'),
              update: jest.fn().mockResolvedValue('updatedUser'),
            },
          },
        ],
      })
        .overrideGuard(JwtAuthGuard)
        .useValue(mockAuthGuard)
        .compile();

      controller = module.get<UsersController>(UsersController);
      usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return all users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(['user1', 'user2']);
    });

    it('should return a unique user', async () => {
      const body = { username: 'user1' };
      const result = await controller.findOne(body);
      expect(result).toEqual('user1');
    });

    it('should update a user', async () => {
      const req = { user: { id: '1' } };
      const body: EditDTO = { username: 'newName', password: 'password' };
      const result = await controller.edit(req, body);
      expect(result).toEqual('updatedUser');
    });
  });
