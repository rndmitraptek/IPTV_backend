import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_room } from 'src/database/iptv/info_room.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { promo } from 'src/database/iptv/promo.entity';
import { resto } from 'src/database/iptv/resto.entity';
import { tv_channelRepository } from './api.repository';
import { Sequelize } from 'sequelize-typescript';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';

@Injectable()
export class ApkService {
    constructor(
        private sequelize:Sequelize,
        @InjectModel(iptv_feature)
        private iptv_featureModel: typeof iptv_feature,
        @InjectModel(nearby_attraction)
        private nearby_attractionModel: typeof nearby_attraction,
        @InjectModel(promo)
        private promoModel: typeof promo,
        @InjectModel(resto)
        private restoModel: typeof resto,
        @InjectModel(greeting_card)
        private greeting_cardModel: typeof greeting_card,
        @InjectModel(info_hotel)
        private info_hotelModel: typeof info_hotel,
        @InjectModel(info_room)
        private info_roomModel: typeof info_room,
        @InjectModel(info_fasilities)
        private info_fasilitiesModel: typeof info_fasilities,
        @InjectModel(entertainment)
        private entertainmentModel: typeof entertainment,
        private tv_channelRepo:tv_channelRepository,
    ) {}

    async getData(req:any):Promise<any>{
        if(req.user.id_hotel==undefined){
            throw('Akun anda tidak memiliki hotel');
        }
        let data = {
            nama : 'Guest',
            iptv : await this.iptv_featureModel.findOne({where:{id:req.user.id_hotel}}),
            nearbyattraction : await this.nearby_attractionModel.findAll({where:{id_hotel:req.user.id_hotel}}),
            promo : await this.promoModel.findAll({
                where:{id_hotel:req.user.id_hotel, is_active:true},
                order:[
                    ['urut','DESC']
                ]
            }),
            resto : await this.restoModel.findAll({
                attributes:[
                    'id_resto',
                    'image_name',
                    'image_url',
                    'title',
                    'description',
                    'harga',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'id_group',
                    [this.sequelize.col('group.nama_group'),'nama_group'],
                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    },
                    {
                        attributes:[],
                        model:restoGroupEntity,
                        as:'group'
                    }
                ],
                where:{id_hotel:req.user.id_hotel},
            }),
            entertainmentModel : await this.entertainmentModel.findAll({where:{is_active:true}}),
            greetingcard : await this.greeting_cardModel.findAll({where:{id_user_device:req.user.id_user,is_active:true}}),
            guesthotel : {
                hotel: await this.info_hotelModel.findOne({
                    where:{
                        id_hotel:req.user.id_hotel
                    },
                    order:[['id','desc']]
                }),
                room : await this.info_roomModel.findAll({where:{id_hotel:req.user.id_hotel}}),
                fasilities : await this.info_fasilitiesModel.findAll({where:{id_hotel:req.user.id_hotel}})
            },
            channel : await this.tv_channelRepo.GetAll()
        };
        return data;
    }
}
