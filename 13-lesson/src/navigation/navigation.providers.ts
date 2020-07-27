import { Provider } from '@nestjs/common';
import NavigationModel from '../models/navigation';

export const navigationProviders: Provider[] = [
    {
        provide: 'NAVIGATION_REPOSITORY',
        useValue: NavigationModel,
    },
];
