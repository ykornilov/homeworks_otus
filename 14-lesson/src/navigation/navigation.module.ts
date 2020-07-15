import { Module } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { navigationProviders } from './navigation.providers';
import { NavigationResolvers } from './navigation.resolvers';

@Module({
    providers: [NavigationService, ...navigationProviders, NavigationResolvers],
})
export class NavigationModule {}