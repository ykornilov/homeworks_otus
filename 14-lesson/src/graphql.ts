
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateNavigationInput {
    name: string;
    url: string;
    icon?: string;
}

export interface UpdateNavigationInput {
    name?: string;
    url?: string;
    icon?: string;
}

export interface IQuery {
    getNavigations(): Navigation[] | Promise<Navigation[]>;
    getNavigation(id: number): Navigation | Promise<Navigation>;
}

export interface IMutation {
    createNavigation(dto: CreateNavigationInput): Navigation | Promise<Navigation>;
    updateNavigation(id: number, dto: UpdateNavigationInput): Navigation | Promise<Navigation>;
    deleteNavigation(id: number): Navigation | Promise<Navigation>;
}

export interface Navigation {
    id: number;
    name: string;
    url: string;
    icon?: string;
}
