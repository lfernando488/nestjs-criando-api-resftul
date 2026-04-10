import { DataSourceOptions } from "typeorm";
import 'dotenv/config';
import { DataSource } from "typeorm";

const dataSourceOptions : DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.BD_PORT),
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    //entities: [__dirname + '/../**/*.entity.{js,ts}'],
    //entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    //migrations: [__dirname + '/../../bd/migrations/*.{js,ts}'],
    //migrations: [__dirname + '/../../bd/migrations/*.ts']
    migrations: ['src/bd/migrations/*.ts'],
    entities: ['src/**/*.entity.ts'],
};

export const AppDataSource = new DataSource(dataSourceOptions);

//export default dataSource;