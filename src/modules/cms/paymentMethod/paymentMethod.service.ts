import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { paymentMethodEntity } from 'src/database/iptv/payment_method.entity';
import { ApkService } from 'src/modules/tv/apk/apk.service';
import {
  insertPaymentMethodModel,
  updatePaymentMethodModel,
} from './paymentMethod.dto';

@Injectable({ scope: Scope.REQUEST })
export class paymentMethodService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(paymentMethodEntity)
    private _paymentMethodEntity: typeof paymentMethodEntity,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<paymentMethodEntity[]> {
    try {
      return this._paymentMethodEntity.findAll({
        attributes: [
          'id_payment_method',
          'payment_method_name',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'is_active',
          'created_at',
          'updated_at',
          'created_by',
          'updated_by',
        ],
        include: [
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
        ],
        where: { id_hotel: req.user.id_hotel },
      });
    } catch (error) {
      throw error;
    }
  }

  findAllActiveOnly(req: any): Promise<paymentMethodEntity[]> {
    try {
      return this._paymentMethodEntity.findAll({
        attributes: [
          'id_payment_method',
          'payment_method_name',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'is_active',
          'created_at',
          'updated_at',
          'created_by',
          'updated_by',
        ],
        include: [
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
        ],
        where: { id_hotel: req.user.id_hotel, is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number): Promise<paymentMethodEntity> {
    return this._paymentMethodEntity.findOne({
      where: {
        id_payment_method: id,
      },
    });
  }

  async create(
    _paymentMethodEntity: insertPaymentMethodModel,
    req: any,
  ): Promise<paymentMethodEntity> {
    if (req.user.id_hotel == undefined) {
      throw 'Akun anda tidak memiliki hotel';
    }

    // if (req.user.id_hotel != undefined) {
    //   let sendWS = await this._ApkService.sendWebsocketData(
    //     req,
    //     'resto_grup',
    //     'create',
    //   );
    // }

    _paymentMethodEntity['is_active'] = true;
    _paymentMethodEntity['created_by'] = req.user.username;
    _paymentMethodEntity['updated_by'] = req.user.username;
    _paymentMethodEntity['id_hotel'] = req.user.id_hotel;

    return this._paymentMethodEntity.create(_paymentMethodEntity);
  }

  async update(
    id: number,
    _paymentMethodEntity: updatePaymentMethodModel,
    req: any,
  ): Promise<void> {
    _paymentMethodEntity['updated_by'] = req.user.username;
    await this._paymentMethodEntity.update(_paymentMethodEntity, {
      where: {
        id_payment_method: id,
      },
    });

    // if (req.user.id_hotel != undefined) {
    //   let sendWS = await this._ApkService.sendWebsocketData(
    //     req,
    //     'resto_grup',
    //     'update',
    //   );
    // }
  }

  async remove(id: number, req: any): Promise<void> {
    await this._paymentMethodEntity.update(
      { is_active: false, updated_by: req.user.username },
      {
        where: {
          id_payment_method: id,
        },
      },
    );

    // if (req.user.id_hotel != undefined) {
    //   let sendWS = await this._ApkService.sendWebsocketData(
    //     req,
    //     'resto_grup',
    //     'delete',
    //   );
    // }
  }
}
