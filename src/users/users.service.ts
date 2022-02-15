import { Injectable } from '@nestjs/common';
import mockUsers from '../mock/mockUsers.json';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = mockUsers;

  async findUserByUserName(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === userName);
  }
}
