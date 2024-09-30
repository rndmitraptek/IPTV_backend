import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { nearby_attraction } from 'src/database/iptv/nearby_attraction.entity';
import { nearby_attractionDtoInsert } from './nearby_attraction.dto';

@Injectable({ scope: Scope.REQUEST })
export class NearbyAttractionService {
    constructor(
        @InjectModel(nearby_attraction)
        private nearby_attractionModel: typeof nearby_attraction,
    ) {}
    
    findAll(): Promise<nearby_attraction[]> {
        try {
            return this.nearby_attractionModel.findAll();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_nearby_attraction: number): Promise<nearby_attraction> {
        return this.nearby_attractionModel.findOne({
            where: {
                id_nearby_attraction:id_nearby_attraction,
            },
        });
    }
    
    async create(_nearby_attraction: nearby_attractionDtoInsert): Promise<nearby_attraction> {
        return this.nearby_attractionModel.create(_nearby_attraction);
    }
    
    async update(id_nearby_attraction: number, _nearby_attraction: nearby_attractionDtoInsert): Promise<void> {
        await this.nearby_attractionModel.update(_nearby_attraction, {
            where: {
                id_nearby_attraction:id_nearby_attraction,
            },
        });
    }
    
    async remove(id_nearby_attraction: number): Promise<void> {
        const nearby_attraction = await this.findOne(id_nearby_attraction);
        await nearby_attraction.destroy();
    }
}
    