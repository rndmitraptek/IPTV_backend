import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { entertainment } from 'src/database/iptv/entertainment.entity';
import { entertainmentDtoInsert } from './entertainment.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class EntertainmentService {
  constructor(
    @InjectModel(entertainment)
    private entertainmentModel: typeof entertainment,
    private _ApkService: ApkService,
  ) {}

  async updateStatusActive(id_app: number, req: any): Promise<entertainment> {
    try {
      let data = await this.entertainmentModel.findOne({
        where: {
          id_app: id_app,
        },
      });
      data.update({
        is_active: !data.is_active,
      });

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'entertainment',
          'update',
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<entertainment[]> {
    try {
      return this.entertainmentModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id_app: number): Promise<entertainment> {
    return this.entertainmentModel.findOne({
      where: {
        id_app: id_app,
      },
    });
  }

  async create(
    _entertainment: entertainmentDtoInsert,
    req: any,
  ): Promise<entertainment> {
    const insert = await this.entertainmentModel.create(_entertainment);
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'entertainment',
        'create',
      );
    }
    return insert;
  }

  async update(
    id_app: number,
    _entertainment: entertainmentDtoInsert,
    req: any,
  ): Promise<void> {
    await this.entertainmentModel.update(_entertainment, {
      where: {
        id_app: id_app,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'entertainment',
        'update',
      );
    }
  }

  async remove(id_app: number, req: any): Promise<void> {
    const entertainment = await this.findOne(id_app);
    await entertainment.destroy();

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'entertainment',
        'delete',
      );
    }
  }
}
