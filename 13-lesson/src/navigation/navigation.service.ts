import { Injectable, Inject } from '@nestjs/common';
import NavigationModel, { CreateNavigationDto, UpdateNavigationDto } from '../models/navigation';

@Injectable()
export class NavigationService {
    constructor(@Inject('NAVIGATION_REPOSITORY') private readonly navigationRepository: typeof NavigationModel) {};

    getAll(): Promise<NavigationModel[]> {
        return this.navigationRepository.findAll();
    };

    getById(id: number): Promise<NavigationModel> {
        return this.navigationRepository.findByPk(id);
    };

    create(dto: CreateNavigationDto): Promise<NavigationModel> {
        return this.navigationRepository.create(dto);
    };

    async update(id: number, dto: UpdateNavigationDto): Promise<NavigationModel> {
        const navigation = await this.getById(id);
        return navigation.update(dto);
    };

    async delete(id: number): Promise<NavigationModel> {
        const navigation = await this.getById(id);
        await navigation.destroy();
        return navigation;
    };
}