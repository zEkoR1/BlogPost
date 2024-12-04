import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { mock } from 'node:test';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

describe ('findAll', () => {
  it('should return all users', async () =>{
    const mockUsers = [{id: 'njknjkn1', username: "John Doe", password: "test"}]
    jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(result).toEqual(mockUsers);
  });
})
describe ('findOne', () => {
  it ('should return one specific user', async () => {
    const mockUser = {id: "1", username: "mock-username", password: "test"}
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser)
  
    const result = await service.findOne("1");
    expect(result).toEqual(mockUser);
  })
})


})

