import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import mockUsers from '../mock/mockUsers.json';

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

  describe('findUserByUserName', () => {
    it('should find a user by its name', async () => {
      const user = mockUsers[0];

      const result = await service.findUserByUserName(user.userName);
      expect(result).toEqual(user);
    });

    it('should return undefined if user does not exists ', async () => {
      const result = await service.findUserByUserName('unknown user');
      expect(result).toEqual(undefined);
    });
  });
});
