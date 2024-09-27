import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";
import * as dotenv from 'dotenv';
import { apk_version } from "./iptv/apk_version.entity";
dotenv.config();

@Injectable({ scope: Scope.REQUEST })
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(@Inject(REQUEST) private readonly req: any) {}

  createSequelizeOptions():SequelizeModuleOptions {
    let req = this.req;
    let models = [];
    let host = (process.env.APP=='DEVELOPMENT')?process.env.POSTGRES_HOST:req['tenant'];
    if(req['tenant']===undefined){
      models = [
        apk_version
      ];
    }else{
      models = [];
    }
    let config:SequelizeModuleOptions = {
        dialect: 'postgres',
        host: (req['tenant']===undefined)?process.env.POSTGRES_HOST:host, // replace with your database host
        port: (req['tenant']===undefined)?parseInt(process.env.POSTGRES_PORT):parseInt(process.env.POSTGRES_PORT_TENANT),  // replace with your database port
        username:process.env.POSTGRES_USERNAME,  // replace with your database username
        password: process.env.POSTGRES_PASSWORD,  // replace with your database password
        database: (req['tenant']===undefined)?process.env.POSTGRES_DATABASE:'tenant', 
        models: models,
        define:{
          timestamps:false,
        },
        minifyAliases:true,
      }
    return config;
  }
}