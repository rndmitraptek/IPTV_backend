import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { warningEntity } from 'src/database/iptv/warning.entity';
import { ApkService } from 'src/modules/tv/apk/apk.service';
import { insertWarning, updateWarning } from './warning.dto';

@Injectable({ scope: Scope.REQUEST })
export class warningService {
  constructor(
    @InjectModel(warningEntity)
    private _warningEntity: typeof warningEntity,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<warningEntity[]> {
    try {
      return this._warningEntity.findAll({
        where: { id_hotel: req.user.id_hotel },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string): Promise<warningEntity> {
    return this._warningEntity.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(_param: insertWarning, req: any): Promise<warningEntity> {
    _param['id_hotel'] = req.user.id_hotel;
    _param['created_by'] = req.user.username;
    const insert = await this._warningEntity.create(_param);
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'warning',
        'create',
      );
    }

    return insert;
  }

  async update(id: string, _param: updateWarning, req: any): Promise<void> {
    _param['updated_by'] = req.user.username;
    await this._warningEntity.update(_param, {
      where: {
        id: id,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'warning',
        'update',
      );
    }
  }
}
