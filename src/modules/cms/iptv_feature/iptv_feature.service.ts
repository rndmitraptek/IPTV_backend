import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { iptv_featureDtoInsert } from './iptv_feature.dto';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';

@Injectable({ scope: Scope.REQUEST })
export class IptvFeatureService {
    constructor(
        @InjectModel(iptv_feature)
        private iptv_featureModel: typeof iptv_feature,
    ) {}
    
    findAll(req:any): Promise<iptv_feature> {
        try {
            return this.iptv_featureModel.findOne({where:{id:req.user.id_hotel}});            
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
    
    async create(_iptv_feature: iptv_featureDtoInsert, req:any): Promise<iptv_feature> {
        if(req.user.is_admin ==undefined){
            throw ('Akun anda tidak diperbolehkan menambah data ini');
        }
        if(req.user.is_admin==false){
            throw ('Akun anda tidak diperbolehkan menambah data ini');
        }
        _iptv_feature['is_active']=true;
        _iptv_feature['created_by']=req.user.username;
        _iptv_feature['updated_by']=req.user.username;
        _iptv_feature['version_data']=0;

        return this.iptv_featureModel.create(_iptv_feature);
    }
    
    async update(id: number, _iptv_feature: iptv_featureDtoInsert,req:any): Promise<void> {
        const cek = await this.iptv_featureModel.findOne({where:{id:id}});
        if(cek==null){
            throw('Data tidak ditemukan');
        }

        _iptv_feature['version_data']=typeof cek.version_data=='string'?parseInt(cek.version_data) + 1 : cek.version_data + 1;
        _iptv_feature['updated_by']=req.user.username;
        if(_iptv_feature.pin !=undefined){
            if(_iptv_feature.pin!=null){
                _iptv_feature.pin = await bcrypt.hash(_iptv_feature.pin, 10);
            }
        }
        
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


    async updateVersionDataAllHotel(transaction:Transaction):Promise<any>{
        try {
            let getAll =await this.iptv_featureModel.findAll();

            for(let i=0; i<getAll.length; i++){
                let versionData =getAll[i].version_data + 1;

                let update =await this.iptv_featureModel.update(
                    {
                        version_data:versionData
                    },
                    {
                        where:{id:getAll[i].id},
                        transaction:transaction
                    }
                );
            }
        } catch (error) {
            throw error;
        }
    }
}
            