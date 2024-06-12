import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { constants } from 'buffer';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<false | Omit<User, 'password'>> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException("Usuário não encontrado!");
    if (bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return false
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, { privateKey: jwtConstants.secret }),
    }
  }
  async register(user: CreateUserDto) {
    const { id, name } = await this.userService.register(user)
    return {
      access_token: this.jwtService.sign({ id, name }, { privateKey: jwtConstants.secret })
    }
  }
}
