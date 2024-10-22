import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { resto } from 'src/database/iptv/resto.entity';
import { restoDtoInsert } from './resto.dto';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { Sequelize } from 'sequelize-typescript';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';

@Injectable({ scope: Scope.REQUEST })
export class RestoService {
    constructor(
        private sequelize:Sequelize,
        @InjectModel(resto)
        private restoModel: typeof resto,
    ) {}
    
    findAll(req:any): Promise<resto[]> {
        try {
            return this.restoModel.findAll({
                attributes:[
                    'id_resto',
                    'image_name',
                    'image_url',
                    'title',
                    'description',
                    'harga',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'id_group',
                    [this.sequelize.col('group.nama_group'),'nama_group'],
                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    },
                    {
                        attributes:[],
                        model:restoGroupEntity,
                        as:'group'
                    }
                ],
                where:{id_hotel:req.user.id_hotel}
            });            
        } catch (error) {
            throw error;
        }
    }


    getByGroup(id_group:number,req:any): Promise<resto[]> {
        try {
            return this.restoModel.findAll({
                attributes:[
                    'id_resto',
                    'image_name',
                    'image_url',
                    'title',
                    'description',
                    'harga',
                    'id_hotel',
                    [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
                    'id_group',
                    [this.sequelize.col('group.nama_group'),'nama_group'],
                ],
                include:[
                    {
                        attributes:[],
                        model:iptv_feature,
                        as:'hotel'
                    },
                    {
                        attributes:[],
                        model:restoGroupEntity,
                        as:'group'
                    }
                ],
                where:{
                    id_group:id_group,
                    id_hotel:req.user.id_hotel
                }
            });            
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
    
    async create(_resto: restoDtoInsert,req:any): Promise<resto> {
        _resto['id_hotel']=req.user.id_hotel;
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
            