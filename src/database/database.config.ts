import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";
import * as dotenv from 'dotenv';
import { apk_version } from "./iptv/apk_version.entity";
import { entertainment } from "./iptv/entertainment.entity";
import { greeting_card } from "./iptv/greeting_card.entity";
import { info_fasilities } from "./iptv/info_fasilities.entity";
import { info_hotel } from "./iptv/info_hotel.entity";
import { info_room } from "./iptv/info_room.entity";
import { iptv_feature } from "./iptv/iptv_feature.entity";
import { menu } from "./iptv/menu.entity";
import { nearby_attraction } from "./iptv/nearby_attraction.entity";
import { promo } from "./iptv/promo.entity";
import { resto } from "./iptv/resto.entity";
import { role } from "./iptv/role.entity";
import { role_menu } from "./iptv/role_menu.entity";
import { tv_channel } from "./iptv/tv_channel.entity";
import { tv_group } from "./iptv/tv_group.entity";
import { users } from "./iptv/users.entity";
import { users_deviceEntity } from "./iptv/users_device.entity";
import { sessionDeviceEntity } from "./iptv/session_device.entity";
import { restoGroupEntity } from "./iptv/resto_group.entity";
import { backgroundEntity } from "./iptv/background.entity";
import { announcementEntity } from "./iptv/announcement.entity";
import { orderRestoEntity } from "./iptv/order_resto.entity";
import { orderRestoDetailEntity } from "./iptv/order_resto_detail.entity";
import { nomor_counter } from "./iptv/nomor_counter.entity";
import { logCallbackEntity } from "./iptv/log_failed_callback.entity";
import { announcementUserEntity } from "./iptv/announcement_user.entity";
import { backgroundUserEntity } from "./iptv/background_user.entity";
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
        apk_version,
        role,
        role_menu,
        users,
        tv_group,
        tv_channel,
        promo,
        info_hotel,
        info_room,
        info_fasilities,
        resto,
        nearby_attraction,
        greeting_card,
        iptv_feature,
        entertainment,
        menu,
        users_deviceEntity,
        sessionDeviceEntity,
        restoGroupEntity,
        backgroundEntity,
        backgroundUserEntity,
        announcementEntity,
        announcementUserEntity,
        orderRestoEntity,
        orderRestoDetailEntity,
        nomor_counter,
        logCallbackEntity
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
        pool:{
          max: 15,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        timezone: '+07:00',  // Mengatur timezone Asia/Jakarta (UTC+7)
        dialectOptions: {
          useUTC: false, // Menonaktifkan UTC
          timezone: 'Asia/Jakarta', // Menggunakan timezone Asia/Jakarta
        },
      }
    return config;
  }
}