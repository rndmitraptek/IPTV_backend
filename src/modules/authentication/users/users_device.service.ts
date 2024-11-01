import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { createUserRoom, loginDeviceDto, loginDto, updateUserRoom, usersDtoInsert, usersDtoUpdate } from './users.dto';
import { response_login_model } from './users.model';
import { Sequelize } from 'sequelize-typescript';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

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
                attributes:[
                    'id_user_device',
                    'id_hotel',
                    'username',
                    'password',
                    'room_id',
                    'is_active',
                    'created_at',
                    'updated_at',
                    'created_by',
                    'updated_by',
                    'device_info',
                ],
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
                ...user.dataValues,
                accesstoken:this.jwtService.sign(
                    {
                        id_user:user.id_user_device,
                        room_id:user.room_id,
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
                attributes:[
                    'id_user_device',
                    'id_hotel',
                    'username',
                    'room_id',
                    'is_active',
                    'created_at',
                    'updated_at',
                    'created_by',
                    'updated_by',
                    'device_info',
                ],
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
                ...user.dataValues,
                accesstoken:this.jwtService.sign(
                    {
                        id_user:user.id_user_device,
                        room_id:user.room_id,
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


    cekToken(req:any){
        if(req.user.id_hotel==undefined){
            throw('Access token not valid!');
        }
        return 'success';
    }


    async getUserRoom(req:any):Promise<any>{
        try {
            if(req.user.id_hotel ==undefined){
                throw ('Akun anda tidak memiliki id hotel');
            }
            let data =await this._users_deviceEntity.findAll({
                attributes:[
                    'id_user_device',
                    'username',
                    'room_id',
                    'is_active',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'created_at',
                    'created_by'
                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    }
                ],
                where:{
                    id_hotel:req.user.id_hotel,
                    is_active:true
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }



    async getById(id_user_device:number,req:any):Promise<any>{
        try {
            if(req.user.id_hotel ==undefined){
                throw ('Akun anda tidak memiliki id hotel');
            }
            let data =await this._users_deviceEntity.findOne({
                attributes:[
                    'id_user_device',
                    'username',
                    'room_id',
                    'device_info',
                    'is_active',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'created_at',
                    'created_by'
                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    }
                ],
                where:{
                    id_user_device:id_user_device
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }


    async insertUserRoom(
        param:createUserRoom,
        req:any
    ):Promise<any>{
        try {
            if(req.user.is_admin ==undefined){
                throw ('Akun anda tidak diperbolehkan menambah data');
            }
            if(req.user.is_admin ==false){
                throw ('Akun anda tidak diperbolehkan menambah data');
            }
            let cekDuplicateUser =await this._users_deviceEntity.findOne({where:{username:param.username}});
            if(cekDuplicateUser!=null){
                throw ('Username sudah digunakan');
            }

            param.password = await bcrypt.hash(param.password, 10);
            let insert =await this._users_deviceEntity.create(
                {
                    username:param.username,
                    room_id:param.room_id,
                    password:param.password,
                    id_hotel:param.id_hotel,
                    is_active:true,
                    created_by:req.user.username
                },
                {
                    fields:[
                        'username',
                        'room_id',
                        'password',
                        'id_hotel',
                        'is_active',
                        'created_by'
                    ]
                }
            );
            if(!insert){
                throw('Tambah akun room device gagal');
            }

            return insert;
        } catch (error) {
            throw error;
        }
    }


    async updateUserRoom(
        param:updateUserRoom,
        req:any
    ):Promise<any>{
        try {
            let cekDuplicateUser =await this._users_deviceEntity.findOne({where:{username:param.username,id_user_device:{ [Op.ne]: param.id_user_device }}});
            if(cekDuplicateUser!=null){
                throw ('Username sudah digunakan');
            }

            let cek_sess =await this._sessionDeviceEntity.findOne({where:{id_user_device:param.id_user_device}});
            if(cek_sess!=null){
                let del_sess=await this._sessionDeviceEntity.destroy({where:{id_user_device:param.id_user_device}});
                if(!del_sess){
                    throw ('session remove failed');
                }
            }

            if(param.password !=undefined && param.password!='' && param.password!=null){

                param.password = await bcrypt.hash(param.password, 10);
                let update =await this._users_deviceEntity.update(
                    {
                        username:param.username,
                        room_id:param.room_id,
                        password:param.password,
                        updated_by:req.user.username
                    },
                    {
                        where:{id_user_device:param.id_user_device}
                    }
                );
                if(!update){
                    throw('Update akun room device gagal');
                }
            } else {
                let update =await this._users_deviceEntity.update(
                    {
                        username:param.username,
                        room_id:param.room_id,
                        updated_by:req.user.username
                    },
                    {
                        where:{id_user_device:param.id_user_device}
                    }
                );
                if(!update){
                    throw('Update akun room device gagal');
                }
            }

            return 'success';
        } catch (error) {
            throw error;
        }
    }


    async deactived(
        id_user_device:number,
        req:any
    ):Promise<any>{
        try {
            let update =await this._users_deviceEntity.update(
                {
                    is_active:false,
                    updated_by:req.user.username
                },
                {
                    where:{id_user_device:id_user_device}
                }
            );
            if(!update){
                throw('Deactived akun room device gagal');
            }

            return 'success';
        } catch (error) {
            throw error;
        }
    }


    async actived(
        id_user_device:number,
        req:any
    ):Promise<any>{
        try {
            let update =await this._users_deviceEntity.update(
                {
                    is_active:true,
                    updated_by:req.user.username
                },
                {
                    where:{id_user_device:id_user_device}
                }
            );
            if(!update){
                throw('Actived akun room device gagal');
            }

            return 'success';
        } catch (error) {
            throw error;
        }
    }
}