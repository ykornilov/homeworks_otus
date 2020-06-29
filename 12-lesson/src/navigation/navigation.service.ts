import { Injectable } from '@nestjs/common';
import { navigations } from '../mocks/navigations';

@Injectable()
export class NavigationService {
    private navigations: Navigation[];

    constructor() {
        this.navigations = navigations;
    };

    getAll(): Promise<Navigation[]> {
        return new Promise(resolve => resolve(this.navigations));
    };

    getById(id: number): Promise<Navigation> {
        return new Promise((resolve, reject) => {
            const result = this.navigations.find(navigation => navigation.id === id);
            if (!result) return reject();

            resolve(result);
        });
    };

    create(dto: CreateNavigationDto): Promise<Navigation> {
        const id = this.navigations.length
            ? this.navigations[this.navigations.length - 1].id + 1
            : 1;
        const newNavigation = {...dto, id};
        this.navigations.push(newNavigation);
        return new Promise(resolve => resolve(newNavigation));
    };

    update(id: number, dto: UpdateNavigationDto): Promise<Navigation> {
        return new Promise((resolve, reject) => {
            const index = this.navigations.findIndex(navigation => navigation.id === id);
            if (index === -1) return reject();

            this.navigations[index] = {...this.navigations[index], ...dto};
            resolve(this.navigations[index]);
        });
    };

    delete(id: number): Promise<Navigation> {
        return new Promise((resolve, reject) => {
            const index = this.navigations.findIndex(navigation => navigation.id === id);
            if (index === -1) return reject();

            const result = this.navigations.splice(index, 1);
            resolve(result[0]);
        });
    };
}