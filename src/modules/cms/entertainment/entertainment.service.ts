import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { entertainmentDtoInsert } from './entertainment.dto';

@Injectable({ scope: Scope.REQUEST })
export class EntertainmentService {
    constructor(
        @InjectModel(entertainment)
        private entertainmentModel: typeof entertainment,
    ) {}

    async updateStatusActive(id_app:number):Promise<entertainment>{
        try {
            let data = await this.entertainmentModel.findOne({
                where:{
                    id_app:id_app
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
    
    findAll(): Promise<entertainment[]> {
        try {
            return this.entertainmentModel.findAll();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_app: number): Promise<entertainment> {
        return this.entertainmentModel.findOne({
            where: {
                id_app:id_app,
            },
        });
    }
    
    async create(_entertainment: entertainmentDtoInsert): Promise<entertainment> {
        return this.entertainmentModel.create(_entertainment);
    }
    
    async update(id_app: number, _entertainment: entertainmentDtoInsert): Promise<void> {
        await this.entertainmentModel.update(_entertainment, {
            where: {
                id_app:id_app,
            },
        });
    }
    
    async remove(id_app: number): Promise<void> {
        const entertainment = await this.findOne(id_app);
        await entertainment.destroy();
    }
}
            