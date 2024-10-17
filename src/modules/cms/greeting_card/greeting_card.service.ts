import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { greeting_card } from 'src/database/iptv/greeting_card.entity';
import { greeting_cardDtoInsert } from './greeting_card.dto';

@Injectable({ scope: Scope.REQUEST })
export class GreetingCardService {
    constructor(
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
            return this.greeting_cardModel.findAll({where:{id_hotel:req.user.id_hotel}});            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_greeting_card: number): Promise<greeting_card> {
        return this.greeting_cardModel.findOne({
            where: {
                id_greeting_card:id_greeting_card,
            },
        });
    }
    
    async create(_greeting_card: greeting_cardDtoInsert): Promise<greeting_card> {
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
            