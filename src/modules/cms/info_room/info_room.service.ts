import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info_room } from 'src/database/iptv/info_room.entity';
import { info_roomDtoInsert } from './info_room.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class InfoRoomService {
  constructor(
    @InjectModel(info_room)
    private info_roomModel: typeof info_room,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<info_room[]> {
    try {
      return this.info_roomModel.findAll({
        where: { id_hotel: req.user.id_hotel },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id_info_room: number): Promise<info_room> {
    return this.info_roomModel.findOne({
      where: {
        id_info_room: id_info_room,
      },
    });
  }

  async create(_info_room: info_roomDtoInsert, req: any): Promise<info_room> {
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'info_room',
        'create',
      );
    }

    _info_room['id_hotel'] = req.user.id_hotel;
    return this.info_roomModel.create(_info_room);
  }

  async update(
    id_info_room: string,
    _info_room: info_roomDtoInsert,
    req: any,
  ): Promise<void> {
    await this.info_roomModel.update(_info_room, {
      where: {
        id_info_room: id_info_room,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'info_room',
        'update',
      );
    }
  }

  async remove(id_info_room: number, req: any): Promise<void> {
    const info_room = await this.findOne(id_info_room);
    await info_room.destroy();

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'info_room',
        'delete',
      );
    }
  }
  
}
