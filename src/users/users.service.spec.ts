import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service'; 
import { EditDTO } from '../DTO/request.dto/EditDTO';
import * as bcrypt from 'bcrypt'
describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue([{ id: 'njknjkn1', username: "John Doe", password: "test" }]),
              findUnique: jest.fn().mockResolvedValue({ id: "1", username: "mock-username", password: "test" }),
              update: jest.fn().mockResolvedValue({ id: '1', username: 'updated-user', password: 'hashed-password' }), // Add this line

            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 'njknjkn1', username: "John Doe", password: "test" }];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      const result = await service.findAll();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return one specific user', async () => {
      const mockUser = { id: "1", username: "mock-username", password: "test" };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      const result = await service.findOne("1");
      expect(result).toEqual(mockUser);
    });


  });
  describe('update', () => {
    it('should update an existing user', async () => {
      const id = "1";
      const body: EditDTO = { username: "updated-user", password: "new-password" };
      const mockUser = { id: "1", username: "updated-user", password: "updated-password" };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const result = await service.update(id, body);
      expect(result).toEqual(mockUser);
    });
  });
});