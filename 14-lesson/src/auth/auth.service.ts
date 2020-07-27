import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {};

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userService.findOne(username);
        if (user && user.password === password) {
            const result: User = user.get();
            delete result.password;
            return result;
        }
        return null;
    };

    async login(user: User): Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
    };
};
