import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_hotelDtoInsert } from './info_hotel.dto';

@Injectable({ scope: Scope.REQUEST })
export class InfoHotelService {
    constructor(
        @InjectModel(info_hotel)
        private info_hotelModel: typeof info_hotel,
    ) {}
    
    findAll(): Promise<info_hotel> {
        try {
            return this.info_hotelModel.findOne({
                where:{
                    id:1
                }
            });            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id: string): Promise<info_hotel> {
        return this.info_hotelModel.findOne({
            where: {
                id:id,
            },
        });
    }
    
    async create(_info_hotel: info_hotelDtoInsert): Promise<info_hotel> {
        return this.info_hotelModel.create(_info_hotel);
    }
    
    async update(id: number, _info_hotel: info_hotelDtoInsert): Promise<void> {
        await this.info_hotelModel.update(_info_hotel, {
            where: {
                id:id,
            },
        });
    }
    
    
}
            