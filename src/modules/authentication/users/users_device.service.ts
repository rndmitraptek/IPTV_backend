import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { loginDeviceDto, loginDto, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { response_login_model } from './users.model';
import { Sequelize } from 'sequelize-typescript';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class UserDeviceService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(users_deviceEntity)
        private _users_deviceEntity: typeof users_deviceEntity,
        @InjectModel(sessionDeviceEntity)
        private _sessionDeviceEntity: typeof sessionDeviceEntity,
        @InjectModel(iptv_feature)
        private _hotelEntity: typeof iptv_feature,
        private sequelize:Sequelize
    ) {}
    

    async login(param:loginDeviceDto,req:any): Promise<any>{
        try {
            const ip =
                req.headers['cs-connection-ip'] ||
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress || '';

            let user = await this._users_deviceEntity.findOne({
                where: {
                    username:param.username,
                    is_active:true
                },
            });
            if(!user){
                throw ('username tidak di temukan');
            }
            if (!await bcrypt.compare(param.password, user.password)) {
                throw ('password salah');
            }

            let cek_sess =await this._sessionDeviceEntity.findOne({where:{id_user_device:user.id_user_device}});
            if(cek_sess!=null){
                let del_sess=await this._sessionDeviceEntity.destroy({where:{id_user_device:user.id_user_device}});
                if(!del_sess){
                    throw ('Login gagal');
                }
            }

            let create_sess =await this._sessionDeviceEntity.create(
                {
                    id_session_device:uuidv4(),
                    id_user_device:user.id_user_device,
                    ip:ip,
                    device_info:param.device_info,
                    created_by:user.username
                },
                {
                    fields:[
                        'id_session_device',
                        'id_user_device',
                        'ip',
                        'device_info',
                        'created_by'
                    ]
                }
            );
            if(!create_sess){
                throw ('Login gagal');
            }

            let update_device =await this._users_deviceEntity.update(
                {
                    device_info:param.device_info
                },
                {
                    where:{
                        id_user_device:user.id_user_device
                    }
                }
            );
            if(!update_device){
                throw ('Login gagal');
            }
 

            return {
                accesstoken:this.jwtService.sign(
                    {
                        id_user:user.id_user_device,
                        username :user.username,
                        id_hotel :user.id_hotel
                    },
                    {
                        expiresIn:'1m'
                    }
                ),
                refreshtoken:this.jwtService.sign(
                    {
                        id_user:user.id_user_device,
                        id_session_device:create_sess.id_session_device
                    }
                )
            };
        } catch (error) {
            throw error;
        }
    }



    async refresh(req:any):Promise<any>{
        try {
            let sess_check =await this._sessionDeviceEntity.findOne({where:{id_session_device:req.user.id_session_device}});
            if(sess_check==null){
                throw ('refresh token invalid');
            }

            const ip =
                req.headers['cs-connection-ip'] ||
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress || '';

            let user = await this._users_deviceEntity.findOne({
                where: {
                    id_user_device:req.user.id_user,
                    is_active:true
                },
            });
            if(!user){
                throw ('refresh token invalid');
            }

            let countRefresh =sess_check.refresh_count ==null ? 1 : typeof sess_check.refresh_count=='string' ? parseInt(sess_check.refresh_count) + 1: sess_check.refresh_count+1;
            let update_sess =await this._sessionDeviceEntity.update(
                {
                    last_refresh_at:new Date(),
                    refresh_count:countRefresh
                },
                {
                    where:{
                        id_session_device :sess_check.id_session_device
                    }
                }
            );
            if(!update_sess){
                throw ('refresh token invalid');
            }



            return {
                accesstoken:this.jwtService.sign(
                    {
                        id_user:user.id_user_device,
                        username :user.username,
                        id_hotel :user.id_hotel
                    },
                    {
                        expiresIn:'1m'
                    }
                )
            };
        } catch (error) {
            throw error;
        }
    }
}