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

@Injectable()
export class ApkService {
    constructor(
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

    async getData(nomor_room:string):Promise<any>{
        let data = {
            nama : 'Jhon Doe',
            iptv : await this.iptv_featureModel.findOne(),
            nearbyattraction : await this.nearby_attractionModel.findAll(),
            promo : await this.promoModel.findAll({
                order:[
                    ['urut','DESC']
                ]
            }),
            resto : await this.restoModel.findAll(),
            entertainmentModel : await this.entertainmentModel.findAll(),
            greetingcard : await this.greeting_cardModel.findAll(),
            guesthotel : {
                hotel: await this.info_hotelModel.findOne({
                    where:{
                        id:1
                    }
                }),
                room : await this.info_roomModel.findAll(),
                fasilities : await this.info_fasilitiesModel.findAll()
            },
            channel : await this.tv_channelRepo.GetAll()
        };
        return data;
    }
}
