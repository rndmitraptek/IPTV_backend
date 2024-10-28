import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { greeting_cardDtoInsert } from './greeting_card.dto';
import { Sequelize } from 'sequelize-typescript';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { greeting_cardUserEntity } from 'src/database/iptv/greeting_card_user.entity';

@Injectable({ scope: Scope.REQUEST })
export class GreetingCardService {
    constructor(
        private sequelize :Sequelize,
        @InjectModel(greeting_card)
        private greeting_cardModel: typeof greeting_card,
        @InjectModel(greeting_cardUserEntity)
        private _greeting_cardUserEntity: typeof greeting_cardUserEntity,
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
    
    async findAll(req:any): Promise<any> {
        try {
            let datas=await this.greeting_cardModel.findAll({
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
                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    },
                    {
                        attributes:['id_greeting_card_user','id_greeting_card','id_user_device'],
                        model:greeting_cardUserEntity,
                        as:'detail',
                        include:[
                            {
                                attributes:['room_id'],
                                model:users_deviceEntity,
                                as:'user_device'
                            }
                        ]
                    }
                ],
                where:{id_hotel:req.user.id_hotel, is_active:true}
            });   
            
            return datas.map(data => ({
                ...data.get(),
                id_user_device: data.detail.map(item => item.id_user_device.toString()),
                no_room: data.detail.map(item => item.user_device.room_id.toString())
            }));  
        } catch (error) {
            throw error;
        }
    }
    
    async findOne(id_greeting_card: number): Promise<any> {
        let data= await this.greeting_cardModel.findOne({
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
            ],
            include:[
                {
                    attributes:[],
                    model:iptv_feature,
                    as:'hotel'
                },
                {
                    attributes:['id_greeting_card_user','id_greeting_card','id_user_device'],
                    model:greeting_cardUserEntity,
                    as:'detail',
                    include:[
                        {
                            attributes:['room_id'],
                            model:users_deviceEntity,
                            as:'user_device'
                        }
                    ]
                }
            ],
            where: {
                id_greeting_card:id_greeting_card,
            },
        });

        return {
            ...data.get(),
            id_user_device: data.detail.map(item => item.id_user_device.toString()),
            no_room: data.detail.map(item => item.user_device.room_id.toString())
        };
    }
    
    async create(_param: greeting_cardDtoInsert,req:any): Promise<any> {
        let transaction = await this.sequelize.transaction();
        try {
            if(req.user.id_hotel ==undefined){
                throw ('Akun anda tidak memiliki hotel');
            }
    
            _param['id_hotel']=req.user.id_hotel;
            _param['is_active']=true;
    
            if(_param.detail_room.length==0){
                throw ('detail room tidak boleh kosong');
            }
    
            let insertHeader= await this.greeting_cardModel.create(_param,{transaction:transaction});
            if(!insertHeader){
                throw('insert gagal');
            }

            for(let i=0; i<_param.detail_room.length; i++){
                let insertDetail=await this._greeting_cardUserEntity.create(
                    {
                        id_greeting_card:insertHeader.id_greeting_card,
                        id_user_device:_param.detail_room[i].id_user_device
                    },
                    {
                        fields:[
                            'id_greeting_card',
                            'id_user_device'
                        ],
                        transaction:transaction
                    }
                );
                if(!insertDetail){
                    throw('insert gagal');
                }
            }

            await transaction.commit();
            return 'success';
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    
    async update(id_greeting_card: number, _param: greeting_cardDtoInsert): Promise<any> {
        let transaction = await this.sequelize.transaction();
        try {
            await this.greeting_cardModel.update(_param, {
                where: {
                    id_greeting_card:id_greeting_card
                },
            });

            let deleteUser =await this._greeting_cardUserEntity.destroy({where:{id_greeting_card:id_greeting_card}});
            if(!deleteUser){
                throw('update gagal');
            }
            for(let i=0; i<_param.detail_room.length; i++){
                let insertDetail=await this._greeting_cardUserEntity.create(
                    {
                        id_greeting_card:id_greeting_card,
                        id_user_device:_param.detail_room[i].id_user_device
                    },
                    {
                        fields:[
                            'id_greeting_card',
                            'id_user_device'
                        ],
                        transaction:transaction
                    }
                );
                if(!insertDetail){
                    throw('update gagal');
                }
            }
            await transaction.commit();
            return 'success';
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    
    async remove(id_greeting_card: number): Promise<void> {
        const greeting_card = await this.findOne(id_greeting_card);
        await greeting_card.destroy();
    }
}
            