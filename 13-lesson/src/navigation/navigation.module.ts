import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { navigationProviders } from './navigation.providers';

@Module({
    controllers: [NavigationController],
    providers: [NavigationService, ...navigationProviders],
})
export class NavigationModule {}