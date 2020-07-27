import { Injectable, Inject } from '@nestjs/common';
import UserModel from '../models/user';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: typeof UserModel) {};

    findOne(username: string): Promise<UserModel> {
        return this.userRepository.findOne({where: {username}});
    };
}