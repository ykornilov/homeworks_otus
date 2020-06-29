import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigations')
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {};

    @Get()
    getAll(): Promise<Navigation[]> {
        return this.navigationService.getAll();
    };

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number): Promise<Navigation> {
        return this.navigationService.getById(id);
    };

    @Post()
    create(@Body() dto: CreateNavigationDto): Promise<Navigation> {
        return this.navigationService.create(dto);
    };

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNavigationDto): Promise<Navigation> {
        return this.navigationService.update(id, dto);
    };

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<Navigation> {
        return this.navigationService.delete(id);
    };
};
