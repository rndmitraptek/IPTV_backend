import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { tv_channelDtoInsert, tv_channelDtoUpdateUrut } from './tv_channel.dto';
import { tv_channelRepository } from './tv_channel.repository';

@Injectable({ scope: Scope.REQUEST })
export class TvChannelService {
    constructor(
        @InjectModel(tv_channel)
        private tv_channelModel: typeof tv_channel,
        private tv_channelRepo:tv_channelRepository,
        private readonly sequelize:Sequelize,
    ) {}

    async updateUrutan(param:tv_channelDtoUpdateUrut[]):Promise<tv_channelDtoUpdateUrut[]>{
        let transaction = await this.sequelize.transaction();
        try {
            for(const detail of param){
                await this.tv_channelModel.update({
                    urut:detail.urut
                },{
                    where:{
                        id_channel:detail.id_channel
                    },
                    transaction:transaction
                });
            }
            transaction.commit();
            return param;
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async updateStatusActive(id_channel:number):Promise<tv_channel>{
        try {
            let data = await this.tv_channelModel.findOne({
                where:{
                    id_channel:id_channel
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

    async updateStatusAssign(id_channel:number):Promise<tv_channel>{
        try {
            let data = await this.tv_channelModel.findOne({
                where:{
                    id_channel:id_channel
                }
            });
            data.update({
                is_assign:!data.is_assign
            })
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    findAll(): Promise<tv_channel[]> {
        try {
            return this.tv_channelRepo.GetAll();            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_group: number): Promise<tv_channel> {
        return this.tv_channelRepo.GetByIdGroup(id_group);
    }
    
    async create(_tv_channel: tv_channelDtoInsert): Promise<tv_channel> {
        let urut = 1;
        let last_urut = await this.tv_channelModel.findOne({
            order:[
                ['urut','DESC']
            ]
        });
        if(last_urut){
            urut = last_urut.urut+1;
        }
        _tv_channel.urut = urut;
        return this.tv_channelModel.create(_tv_channel);
    }
    
    async update(id_channel: string, _tv_channel: tv_channelDtoInsert): Promise<void> {
        await this.tv_channelModel.update(_tv_channel, {
            where: {
                id_channel:id_channel,
            },
        });
    }
    
    async remove(id_channel: number): Promise<void> {
        const tv_channel = await this.tv_channelModel.findOne({
            where:{
                id_channel:id_channel
            }
        });
        await tv_channel.destroy();
    }
}
