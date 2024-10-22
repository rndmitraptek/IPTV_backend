import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { hotelDtoInsert } from './hotel.dto';

@Injectable({ scope: Scope.REQUEST })
export class HotelService {
    constructor(
        @InjectModel(iptv_feature)
        private iptv_featureModel: typeof iptv_feature,
    ) {}
    
    findAll(req:any): Promise<iptv_feature[]> {
        try {
            return this.iptv_featureModel.findAll({order:[['id','desc']]});            
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
    
    async create(_iptv_feature: hotelDtoInsert, req:any): Promise<iptv_feature> {
        if(req.user.is_admin ==undefined){
            throw ('Akun anda tidak diperbolehkan menambah data ini');
        }
        if(req.user.is_admin==false){
            throw ('Akun anda tidak diperbolehkan menambah data ini');
        }
        _iptv_feature['is_active']=true;
        _iptv_feature['created_by']=req.user.username;
        _iptv_feature['updated_by']=req.user.username;

        return this.iptv_featureModel.create(_iptv_feature);
    }
    
    async update(id: number, _iptv_feature: hotelDtoInsert,req:any): Promise<void> {
        _iptv_feature['updated_by']=req.user.username;
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
