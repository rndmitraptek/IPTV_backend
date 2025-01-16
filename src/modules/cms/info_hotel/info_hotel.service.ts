import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info_hotel } from 'src/database/iptv/info_hotel.entity';
import { info_hotelDtoInsert } from './info_hotel.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class InfoHotelService {
  constructor(
    @InjectModel(info_hotel)
    private info_hotelModel: typeof info_hotel,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<info_hotel> {
    try {
      return this.info_hotelModel.findOne({
        where: {
          id_hotel: req.user.id_hotel,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string): Promise<info_hotel> {
    return this.info_hotelModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(
    _info_hotel: info_hotelDtoInsert,
    req: any,
  ): Promise<info_hotel> {
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'about_us',
        'create',
      );
    }

    _info_hotel['id_hotel'] = req.user.id_hotel;

    return this.info_hotelModel.create(_info_hotel);
  }

  async update(
    id: number,
    _info_hotel: info_hotelDtoInsert,
    req: any,
  ): Promise<void> {
    await this.info_hotelModel.update(_info_hotel, {
      where: {
        id: id,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'about_us',
        'update',
      );
    }
  }
}
