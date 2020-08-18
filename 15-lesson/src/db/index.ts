import { Sequelize } from 'sequelize-typescript';
import models from '../models';

const db: Sequelize = new Sequelize(process.env.DATABASE_URL as string, {repositoryMode: true});

export default db;

export const initDatabase = async (db: Sequelize): Promise<void> => {
    db.addModels(models);
    try {
        await db.authenticate();
        console.log('Connection to database has been established successfully');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};
