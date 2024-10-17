import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { resto } from 'src/database/iptv/resto.entity';
import { restoDtoInsert } from './resto.dto';

@Injectable({ scope: Scope.REQUEST })
export class RestoService {
    constructor(
        @InjectModel(resto)
        private restoModel: typeof resto,
    ) {}
    
    findAll(req:any): Promise<resto[]> {
        try {
            return this.restoModel.findAll({where:{id_hotel:req.user.id_hotel}});            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_resto: number): Promise<resto> {
        return this.restoModel.findOne({
            where: {
                id_resto:id_resto,
            },
        });
    }
    
    async create(_resto: restoDtoInsert): Promise<resto> {
        return this.restoModel.create(_resto);
    }
    
    async update(id_resto: number, _resto: restoDtoInsert): Promise<void> {
        await this.restoModel.update(_resto, {
            where: {
                id_resto:id_resto,
            },
        });
    }
    
    async remove(id_resto: number): Promise<void> {
        const resto = await this.findOne(id_resto);
        await resto.destroy();
    }
}
            