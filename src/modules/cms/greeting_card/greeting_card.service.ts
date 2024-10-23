import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { greeting_cardDtoInsert } from './greeting_card.dto';
import { Sequelize } from 'sequelize-typescript';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';

@Injectable({ scope: Scope.REQUEST })
export class GreetingCardService {
    constructor(
        private sequelize :Sequelize,
        @InjectModel(greeting_card)
        private greeting_cardModel: typeof greeting_card,
    ) {}

    async updateStatusActive(id_greeting_card:number):Promise<greeting_card>{
        try {
            let data = await this.greeting_cardModel.findOne({
                where:{
                    id_greeting_card:id_greeting_card
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
    
    findAll(req:any): Promise<greeting_card[]> {
        try {
            return this.greeting_cardModel.findAll({
                attributes:[
                    'id_greeting_card',
                    'video_name',
                    'video_url',
                    'no_room',
                    'start_date',
                    'end_date',
                    'is_active',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'id_user_device',
                    [this.sequelize.col('user_device.room_id'),'room_id'],
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
                where:{id_hotel:req.user.id_hotel, is_active:true}
            });            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_greeting_card: number): Promise<greeting_card> {
        return this.greeting_cardModel.findOne({
            attributes:[
                'id_greeting_card',
                'video_name',
                'video_url',
                'no_room',
                'start_date',
                'end_date',
                'is_active',
                'id_hotel',
                [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                'id_user_device',
                [this.sequelize.col('user_device.room_id'),'room_id'],
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
                id_greeting_card:id_greeting_card,
            },
        });
    }
    
    async create(_greeting_card: greeting_cardDtoInsert,req:any): Promise<greeting_card> {
        if(req.user.id_hotel==undefined){
            throw ('Akun anda tidak memiliki hotel');
        }
        _greeting_card['id_hotel']=req.user.id_hotel;
        return this.greeting_cardModel.create(_greeting_card);
    }
    
    async update(id_greeting_card: number, _greeting_card: greeting_cardDtoInsert): Promise<void> {
        await this.greeting_cardModel.update(_greeting_card, {
            where: {
                id_greeting_card:id_greeting_card,
            },
        });
    }
    
    async remove(id_greeting_card: number): Promise<void> {
        const greeting_card = await this.findOne(id_greeting_card);
        await greeting_card.destroy();
    }
}
            