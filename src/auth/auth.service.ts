import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, userPassword: string): Promise<any> {
    const user = await this.usersService.findUserByUserName(userName);
    if (user && user.password === userPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //async login(user: { userName: string; userId: string }) {
  async login(user: any) {
    const payload = { username: user.userName, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
