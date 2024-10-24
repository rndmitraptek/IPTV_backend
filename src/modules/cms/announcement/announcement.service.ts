import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { announcementEntity } from 'src/database/iptv/announcement.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { insertAnnouncement } from './announcement.dto';

@Injectable({ scope: Scope.REQUEST })
export class AnnouncementService {
    constructor(
        private sequelize:Sequelize,
        @InjectModel(announcementEntity)
        private _announcementEntity: typeof announcementEntity,
    ) {}
    
    findAll(req:any): Promise<announcementEntity[]> {
        try {
            return this._announcementEntity.findAll({
                attributes:[
                    'id_announcement',
                    'description',
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
                order:[['id_announcement','desc']]
            });          
            
        } catch (error) {
            throw error;
        }
    }

    
    findOne(id: number): Promise<announcementEntity> {
        return this._announcementEntity.findOne({
            attributes:[
                'id_announcement',
                'description',
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
                id_announcement:id,
                is_active:true
            },
        });

    }
    
    async create(_announcementEntity: insertAnnouncement,req:any): Promise<any> {
        if(req.user.id_hotel ==undefined){
            throw ('Akun anda tidak memiliki hotel');
        }

        _announcementEntity['created_by']=req.user.username;
        _announcementEntity['updated_by']=req.user.username;
        _announcementEntity['id_hotel']=req.user.id_hotel;
        _announcementEntity['is_active']=true;

        if(_announcementEntity.detail_room.length==0){
            throw ('detail room tidak boleh kosong');
        }

        for(let i=0; i<_announcementEntity.detail_room.length; i++){
            _announcementEntity['id_user_device']=_announcementEntity.detail_room[i].id_user_device;
            await this._announcementEntity.create(_announcementEntity);
        }
        return 'success';
    }
    
    async update(id: number, _announcementEntity: insertAnnouncement,req:any): Promise<void> {
        _announcementEntity['updated_by']=req.user.username;
        await this._announcementEntity.update(_announcementEntity, {
            where: {
                id_announcement:id,
            },
        });
    }
    
    async updateStatusActive(id_announcement:number):Promise<announcementEntity>{
        try {
            let data = await this._announcementEntity.findOne({
                where:{
                    id_announcement:id_announcement
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
            