import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NavigationService } from './navigation.service';
import { Navigation, CreateNavigationInput, UpdateNavigationInput } from '../graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';

@Resolver('Navigation')
export class NavigationResolvers {
    constructor(private readonly navigationService: NavigationService) {};

    @Query('getNavigations')
    @UseGuards(GqlAuthGuard)
    async getAll(): Promise<Navigation[]> {
        return this.navigationService.getAll();
    };

    @Query('getNavigation')
    async get(@Args('id', ParseIntPipe) id: number): Promise<Navigation> {
        return this.navigationService.getById(id);
    };

    @Mutation('createNavigation')
    async create(@Args('dto') dto: CreateNavigationInput): Promise<Navigation> {
        return this.navigationService.create(dto);
    };

    @Mutation('updateNavigation')
    async update(@Args('id', ParseIntPipe) id: number, @Args('dto') dto: UpdateNavigationInput): Promise<Navigation> {
        return this.navigationService.update(id, dto);
    };

    @Mutation('deleteNavigation')
    async delete(@Args('id', ParseIntPipe) id: number): Promise<Navigation> {
        return this.navigationService.delete(id);
    };
};
