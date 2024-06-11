import { Injectable } from '@nestjs/common';
import { CreateUserDto, EditUserData } from './userDTO';

@Injectable()
export class UserService {
    login(data: CreateUserDto) {}
    register(data: CreateUserDto) {}
    edit(edit: EditUserData) {}
    adquireBadge(token: string) {}
}
