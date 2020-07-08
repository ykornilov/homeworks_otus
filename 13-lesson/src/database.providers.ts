import { Sequelize } from 'sequelize-typescript';
import db from './config/db';
import { Provider } from '@nestjs/common';
import models from './models';

export const databaseProviders: Provider[] = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (): Promise<Sequelize> => {            
            db.addModels(models);
            try {
                await db.authenticate();
                console.log('Connection has been established successfully');
            } catch (error) {
                console.error('Unable to connect to the database: ', error);
            };
            // await db.sync();
            return db;
        },
    },
];
