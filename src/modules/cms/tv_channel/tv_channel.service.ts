import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { tv_channelDtoInsert } from './tv_channel.dto';
import { tv_channelRepository } from './tv_channel.repository';

@Injectable({ scope: Scope.REQUEST })
export class TvChannelService {
    constructor(
        @InjectModel(tv_channel)
        private tv_channelModel: typeof tv_channel,
        private tv_channelRepo:tv_channelRepository
    ) {}

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
        const tv_channel = await this.findOne(id_channel);
        await tv_channel.destroy();
    }
}
