import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { promo } from 'src/database/iptv/promo.entity';
import { promoDtoInsert } from './promo.dto';

@Injectable({ scope: Scope.REQUEST })
export class PromoService {
    constructor(
        @InjectModel(promo)
        private promoModel: typeof promo,
    ) {}
    
    findAll(): Promise<promo[]> {
        try {
            return this.promoModel.findAll();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_promo: string): Promise<promo> {
        return this.promoModel.findOne({
            where: {
                id_promo:id_promo,
            },
        });
    }
    
    async create(_promo: promoDtoInsert): Promise<promo> {
        return this.promoModel.create(_promo);
    }
    
    async update(id_promo: string, _promo: promoDtoInsert): Promise<void> {
        await this.promoModel.update(_promo, {
            where: {
                id_promo:id_promo,
            },
        });
    }
    
    async remove(id_promo: string): Promise<void> {
        const promo = await this.findOne(id_promo);
        await promo.destroy();
    }
}
            
