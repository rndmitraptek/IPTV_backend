import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info_fasilities } from 'src/database/iptv/info_fasilities.entity';
import { info_fasilitiesDtoInsert } from './info_fasilities.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class InfoFasilitiesService {
  constructor(
    @InjectModel(info_fasilities)
    private info_fasilitiesModel: typeof info_fasilities,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<info_fasilities[]> {
    try {
      return this.info_fasilitiesModel.findAll({
        where: { id_hotel: req.user.id_hotel },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id_info_fasilites: string): Promise<info_fasilities> {
    return this.info_fasilitiesModel.findOne({
      where: {
        id_info_fasilites: id_info_fasilites,
      },
    });
  }

  async create(
    _info_fasilities: info_fasilitiesDtoInsert,
    req: any,
  ): Promise<info_fasilities> {
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'fasilities',
        'create',
      );
    }

    _info_fasilities['id_hotel'] = req.user.id_hotel;

    return this.info_fasilitiesModel.create(_info_fasilities);
  }

  async update(
    id_info_fasilites: string,
    _info_fasilities: info_fasilitiesDtoInsert,
    req: any,
  ): Promise<void> {
    await this.info_fasilitiesModel.update(_info_fasilities, {
      where: {
        id_info_fasilites: id_info_fasilites,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'fasilities',
        'update',
      );
    }
  }

  async remove(id_info_fasilites: string, req: any): Promise<void> {
    const info_fasilities = await this.findOne(id_info_fasilites);
    await info_fasilities.destroy();

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'fasilities',
        'delete',
      );
    }
  }
}
