import { Sequelize } from 'sequelize-typescript';
import { IServices } from '../@types/services';
import { initDatabase } from '../db';
import { Navigation } from '../models/navigation';
import { NavigationService } from './navigation';

export const configureServices = async (db: Sequelize): Promise<IServices> => {
    await initDatabase(db);

    return {
        navigationService: new NavigationService(db.getRepository(Navigation)),
    };
};
