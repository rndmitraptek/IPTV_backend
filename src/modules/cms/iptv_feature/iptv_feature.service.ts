import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { iptv_featureDtoInsert } from './iptv_feature.dto';

@Injectable({ scope: Scope.REQUEST })
export class IptvFeatureService {
    constructor(
        @InjectModel(iptv_feature)
        private iptv_featureModel: typeof iptv_feature,
    ) {}
    
    findAll(): Promise<iptv_feature> {
        try {
            return this.iptv_featureModel.findOne();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id: number): Promise<iptv_feature> {
        return this.iptv_featureModel.findOne({
            where: {
                id:id,
            },
        });
    }
    
    async create(_iptv_feature: iptv_featureDtoInsert): Promise<iptv_feature> {
        return this.iptv_featureModel.create(_iptv_feature);
    }
    
    async update(id: number, _iptv_feature: iptv_featureDtoInsert): Promise<void> {
        await this.iptv_featureModel.update(_iptv_feature, {
            where: {
                id:id,
            },
        });
    }
    
    async remove(id: number): Promise<void> {
        const iptv_feature = await this.findOne(id);
        await iptv_feature.destroy();
    }
}
            