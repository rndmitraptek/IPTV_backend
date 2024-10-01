import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { info_fasilitiesDtoInsert } from './info_fasilities.dto';

@Injectable({ scope: Scope.REQUEST })
export class InfoFasilitiesService {
    constructor(
        @InjectModel(info_fasilities)
        private info_fasilitiesModel: typeof info_fasilities,
    ) {}
    
    findAll(): Promise<info_fasilities[]> {
        try {
            return this.info_fasilitiesModel.findAll();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_info_fasilites: string): Promise<info_fasilities> {
        return this.info_fasilitiesModel.findOne({
            where: {
                id_info_fasilites:id_info_fasilites,
            },
        });
    }
    
    async create(_info_fasilities: info_fasilitiesDtoInsert): Promise<info_fasilities> {
        return this.info_fasilitiesModel.create(_info_fasilities);
    }
    
    async update(id_info_fasilites: string, _info_fasilities: info_fasilitiesDtoInsert): Promise<void> {
        await this.info_fasilitiesModel.update(_info_fasilities, {
            where: {
                id_info_fasilites:id_info_fasilites,
            },
        });
    }
    
    async remove(id_info_fasilites: string): Promise<void> {
        const info_fasilities = await this.findOne(id_info_fasilites);
        await info_fasilities.destroy();
    }
}
            