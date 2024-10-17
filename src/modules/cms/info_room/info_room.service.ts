import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info_room } from 'src/database/iptv/info_room.entity';
import { info_roomDtoInsert } from './info_room.dto';

@Injectable({ scope: Scope.REQUEST })
export class InfoRoomService {
    constructor(
        @InjectModel(info_room)
        private info_roomModel: typeof info_room,
    ) {}
    
    findAll(req:any): Promise<info_room[]> {
        try {
            return this.info_roomModel.findAll({where:{id_hotel:req.user.id_hotel}});            
        } catch (error) {
            throw error;
        }
    }
    
    findOne(id_info_room: number): Promise<info_room> {
        return this.info_roomModel.findOne({
            where: {
                id_info_room:id_info_room,
            },
        });
    }
    
    async create(_info_room: info_roomDtoInsert): Promise<info_room> {
        return this.info_roomModel.create(_info_room);
    }
    
    async update(id_info_room: string, _info_room: info_roomDtoInsert): Promise<void> {
        await this.info_roomModel.update(_info_room, {
            where: {
                id_info_room:id_info_room,
            },
        });
    }
    
    async remove(id_info_room: number): Promise<void> {
        const info_room = await this.findOne(id_info_room);
        await info_room.destroy();
    }
}
            