import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
export const sequelizeConfig: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,  // replace with your database host
    port: parseInt(process.env.POSTGRES_PORT),  // replace with your database port
    username:process.env.POSTGRES_USERNAME,  // replace with your database username
    password: process.env.POSTGRES_PASSWORD,  // replace with your database password
    database: process.env.POSTGRES_DATABASE,  // replace with your database name
    autoLoadModels: true,
    synchronize: (process.env.APP=="PRODUCTION")?false:true,  // set to false in production
    models: [],
    define:{
        timestamps:false,
    },
    minifyAliases:true,
};