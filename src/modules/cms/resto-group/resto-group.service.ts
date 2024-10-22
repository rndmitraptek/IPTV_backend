import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';
import { insertRestoGroup } from './resto-group.dto';

@Injectable({ scope: Scope.REQUEST })
export class RestoGroupService {
    constructor(
        private sequelize:Sequelize,
        @InjectModel(restoGroupEntity)
        private _restoGroupEntity: typeof restoGroupEntity,
    ) {}
    
    findAll(req:any): Promise<restoGroupEntity[]> {
        try {
            return this._restoGroupEntity.findAll({
                attributes:[
                    'id_group',
                    'nama_group',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'is_active',
                    'created_at',
                    'updated_at',
                    'created_by',
                    'updated_by',

                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    }
                ],
                where:{id_hotel:req.user.id_hotel}
            });            
        } catch (error) {
            throw error;
        }
    }

    
    findOne(id: number): Promise<restoGroupEntity> {
        return this._restoGroupEntity.findOne({
            where: {
                id_group:id,
            },
        });
    }
    
    async create(_restoGroupEntity: insertRestoGroup, req:any): Promise<restoGroupEntity> {
        if(req.user.id_hotel ==undefined){
            throw ('Akun anda tidak memiliki hotel');
        }
        _restoGroupEntity['is_active']=true;
        _restoGroupEntity['created_by']=req.user.username;
        _restoGroupEntity['updated_by']=req.user.username;
        _restoGroupEntity['id_hotel']=req.user.id_hotel;

        return this._restoGroupEntity.create(_restoGroupEntity);
    }
    
    async update(id: number, _restoGroupEntity: insertRestoGroup,req:any): Promise<void> {
        _restoGroupEntity['updated_by']=req.user.username;
        await this._restoGroupEntity.update(_restoGroupEntity, {
            where: {
                id_group:id,
            },
        });
    }
    
    async remove(id: number,req:any): Promise<void> {
        await this._restoGroupEntity.update({is_active:false,updated_by:req.user.username}, {
            where: {
                id_group:id,
            },
        });
    }
}
            