import { Repository } from 'sequelize-typescript';
import { Navigation } from '../models/navigation';

export class NavigationService {
    constructor(private readonly navigationRepository: Repository<Navigation>) {}

    getAllNavigations(): Promise<Navigation[]> {
        return this.navigationRepository.findAll();
    }

    getNavigation(id: number): Promise<Navigation> {
        return this.navigationRepository.findOne({ where: { id } });
    }

    addNavigation(navigation: string): Promise<Navigation> {
        return this.navigationRepository.create({navigation});
    }

    async updateNavigation(id: number, navigation: string): Promise<Navigation> {
        await this.navigationRepository.update({navigation}, { where: { id } });
        return this.navigationRepository.findOne({ where: { id } });
    }

    async deleteNavigation(id: number): Promise<Navigation> {
        const navigation = await this.navigationRepository.findOne({ where: { id } });
        if (navigation) {
            navigation.destroy();
        }
        return navigation;
    }
}
