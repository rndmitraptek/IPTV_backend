import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { BuckectName } from 'src/utility/constant';
import { MinioClientService } from 'src/utility/minio-client.utils';
import { insertBackground } from './background.dto';
import { BufferedFile } from 'src/utility/minio-client.model';

@Injectable({ scope: Scope.REQUEST })
export class BackgroundService {
    constructor(
        private sequelize:Sequelize,
        @InjectModel(backgroundEntity)
        private _backgroundEntity: typeof backgroundEntity,
        private MinioClientService: MinioClientService,
    ) {}
    
    findAll(req:any): Promise<backgroundEntity[]> {
        try {
            return this._backgroundEntity.findAll({
                attributes:[
                    'id_background',
                    'background_url',
                    'start_date',
                    'end_date',
                    'is_active',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'id_user_device',
                    [this.sequelize.col('user_device.room_id'),'room_id'],
                    'created_at',
                    'updated_at',
                    'created_by',
                    'updated_by',

                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    },
                    {
                        attributes:[],
                        model:users_deviceEntity,
                        as:'user_device'
                    }
                ],
                where:{id_hotel:req.user.id_hotel,is_active:true},
                order:[['id_background','desc']]
            });          
            
        } catch (error) {
            throw error;
        }
    }

    
    findOne(id: number): Promise<backgroundEntity> {
        return this._backgroundEntity.findOne({
            attributes:[
                'id_background',
                'background_url',
                'start_date',
                'end_date',
                'is_active',
                'id_hotel',
                [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                'id_user_device',
                [this.sequelize.col('user_device.room_id'),'room_id'],
                'created_at',
                'updated_at',
                'created_by',
                'updated_by',

            ],
            include:[
                {
                    attributes:[],
                    model:iptv_feature,
                    as:'hotel'
                },
                {
                    attributes:[],
                    model:users_deviceEntity,
                    as:'user_device'
                }
            ],
            where: {
                id_background:id,
                is_active:true
            },
        });

    }
    
    async create(_backgroundEntity: insertBackground,req:any): Promise<any> {
        if(req.user.id_hotel ==undefined){
            throw ('Akun anda tidak memiliki hotel');
        }

        _backgroundEntity['created_by']=req.user.username;
        _backgroundEntity['updated_by']=req.user.username;
        _backgroundEntity['id_hotel']=req.user.id_hotel;
        _backgroundEntity['is_active']=true;

        if(_backgroundEntity.detail_room.length==0){
            throw ('detail room tidak boleh kosong');
        }

        for(let i=0; i<_backgroundEntity.detail_room.length; i++){
            _backgroundEntity['id_user_device']=_backgroundEntity.detail_room[i].id_user_device;
            await this._backgroundEntity.create(_backgroundEntity);
        }
        return 'success';
    }
    
    async update(id: number, _backgroundEntity: insertBackground,req:any): Promise<void> {
        _backgroundEntity['updated_by']=req.user.username;
        await this._backgroundEntity.update(_backgroundEntity, {
            where: {
                id_background:id,
            },
        });
    }
    
    async updateStatusActive(id_background:number):Promise<backgroundEntity>{
        try {
            let data = await this._backgroundEntity.findOne({
                where:{
                    id_background:id_background
                }
            });
            data.update({
                is_active:!data.is_active
            })
            return data;
        } catch (error) {
            throw error;
        }
    }
}
            