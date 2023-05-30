import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async signup(newUser: SignupDto): Promise<{ accessToken: string }> {
    if (this.users.find(u => u.username === newUser.username)) {
      throw new ConflictException(`User with username ${newUser.username} already exists`);
    }
    const user = {
      username: newUser.username,
      password: await argon2.hash(newUser.password),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    this.users.push(user);
    return { accessToken: this.jwtService.sign({ sub: user.username }) };
  }
}