import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { promo } from 'src/database/iptv/promo.entity';
import { promoDtoInsert } from './promo.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class PromoService {
  constructor(
    @InjectModel(promo)
    private promoModel: typeof promo,
    private _ApkService: ApkService,
  ) {}

  async updateStatusActive(id_promo: number, req: any): Promise<promo> {
    try {
      let data = await this.promoModel.findOne({
        where: {
          id_promo: id_promo,
        },
      });
      data.update({
        is_active: !data.is_active,
      });

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'promo',
          'update',
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  findAll(req: any): Promise<promo[]> {
    try {
      return this.promoModel.findAll({
        where: { id_hotel: req.user.id_hotel },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id_promo: string): Promise<promo> {
    return this.promoModel.findOne({
      where: {
        id_promo: id_promo,
      },
    });
  }

  async create(_promo: promoDtoInsert, req: any): Promise<promo> {
    let urut = 1;
    let last_urut = await this.promoModel.findOne({
      order: [['urut', 'DESC']],
    });
    if (last_urut) {
      urut = last_urut.urut + 1;
    }

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'promo',
        'create',
      );
    }

    _promo.urut = urut;
    _promo['id_hotel'] = req.user.id_hotel;
    return this.promoModel.create(_promo);
  }

  async update(
    id_promo: string,
    _promo: promoDtoInsert,
    req: any,
  ): Promise<void> {
    await this.promoModel.update(_promo, {
      where: {
        id_promo: id_promo,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'promo',
        'update',
      );
    }
  }

  async remove(id_promo: string, req: any): Promise<void> {
    const promo = await this.findOne(id_promo);
    await promo.destroy();

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'promo',
        'delete',
      );
    }
  }
}
