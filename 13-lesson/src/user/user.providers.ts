import { Provider } from '@nestjs/common';
import UserModel from '../models/user';

export const userProviders: Provider[] = [
    {
        provide: 'USER_REPOSITORY',
        useValue: UserModel,
    },
];
