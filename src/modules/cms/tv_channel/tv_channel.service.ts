import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { tv_channelDtoInsert, tv_channelDtoUpdateUrut } from './tv_channel.dto';
import { tv_channelRepository } from './tv_channel.repository';
import { IptvFeatureService } from '../iptv_feature/iptv_feature.service';

@Injectable({ scope: Scope.REQUEST })
export class TvChannelService {
    constructor(
        @InjectModel(tv_channel)
        private tv_channelModel: typeof tv_channel,
        private tv_channelRepo:tv_channelRepository,
        private _IptvFeatureService:IptvFeatureService,
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

            let updateVersionDataAllHotel =await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

            transaction.commit();
            return param;
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async updateStatusActive(id_channel:number):Promise<tv_channel>{
        let transaction = await this.sequelize.transaction();
        try {
            let data = await this.tv_channelModel.findOne({
                where:{
                    id_channel:id_channel
                }
            });
            data.update({
                is_active:!data.is_active
            })

            let updateVersionDataAllHotel =await this._IptvFeatureService.updateVersionDataAllHotel(transaction);
            
            transaction.commit();
            return data;
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async updateStatusAssign(id_channel:number):Promise<tv_channel>{
        let transaction = await this.sequelize.transaction();
        try {
            let data = await this.tv_channelModel.findOne({
                where:{
                    id_channel:id_channel
                }
            });
            data.update({
                is_assign:!data.is_assign
            })

            let updateVersionDataAllHotel =await this._IptvFeatureService.updateVersionDataAllHotel(transaction);
            
            transaction.commit();
            return data;
        } catch (error) {
            transaction.rollback();
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
        let transaction = await this.sequelize.transaction();
        try {
            
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
            let insert =await this.tv_channelModel.create(_tv_channel);
    
            let updateVersionDataAllHotel =await this._IptvFeatureService.updateVersionDataAllHotel(transaction);
                
            transaction.commit();
            return insert;
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }
    
    async update(id_channel: string, _tv_channel: tv_channelDtoInsert): Promise<void> {
        let transaction = await this.sequelize.transaction();
        try {
            await this.tv_channelModel.update(_tv_channel, {
                where: {
                    id_channel:id_channel,
                },
                transaction:transaction
            });
            
            let updateVersionDataAllHotel =await this._IptvFeatureService.updateVersionDataAllHotel(transaction);
                
            transaction.commit();
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }
    
    async remove(id_channel: number): Promise<void> {
        let transaction = await this.sequelize.transaction();
        try {
            const tv_channel = await this.tv_channelModel.findOne({
                where:{
                    id_channel:id_channel
                }
            });
            await tv_channel.destroy();
    
            let updateVersionDataAllHotel =await this._IptvFeatureService.updateVersionDataAllHotel(transaction);
                    
            transaction.commit();
            
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }
}
