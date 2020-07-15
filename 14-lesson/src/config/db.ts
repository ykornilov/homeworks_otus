import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

const { DB_DIALECT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const db = new Sequelize({
    dialect: DB_DIALECT as Dialect,
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
});

export default db;
