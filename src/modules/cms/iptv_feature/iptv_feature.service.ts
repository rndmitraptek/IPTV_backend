import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { iptv_featureDtoInsert } from './iptv_feature.dto';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';
import { ApkService } from 'src/modules/tv/apk/apk.service';
import { hotelChannel_0Entity } from 'src/database/iptv/hotel_channel_0.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable({ scope: Scope.REQUEST })
export class IptvFeatureService {
  constructor(
    @InjectModel(iptv_feature)
    private iptv_featureModel: typeof iptv_feature,
    @InjectModel(hotelChannel_0Entity)
    private _hotelChannel_0Entity: typeof hotelChannel_0Entity,
    private _ApkService: ApkService,
    private sequelize: Sequelize,
  ) {}

  async findAll(req: any): Promise<iptv_feature> {
    try {
      let data = await this.iptv_featureModel.findOne({
        attributes: [
          'id',
          'video_splash_name',
          'video_splash_url',
          'title_hotel',
          'logo_hotel_name',
          'logo_hotel_url',
          'background_image_name',
          'background_image_url',
          'default_home',
          'address',
          'expired_date',
          'actived_at',
          'created_at',
          'updated_at',
          'created_by',
          'updated_by',
          'is_active',
          'api_guest',
          'api_method',
          'api_secret',
          'is_midtrans',
          'midtrans_server_key',
          'midtrans_client_key',
          'is_midtrans_production',
          'pin',
          'version_data',
          'is_background_video',
          'background_video_name',
          'background_video_url',
        ],
        include: [
          {
            model: hotelChannel_0Entity,
            as: 'detail_channel_0',
            required: false,
            where: { is_active: true },
          },
        ],
        where: { id: req.user.id_hotel },
        order: [this.sequelize.col('detail_channel_0.urutan')],
      });
      data.pin = '';
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<iptv_feature> {
    let data = await this.iptv_featureModel.findOne({
      attributes: [
        'id',
        'video_splash_name',
        'video_splash_url',
        'title_hotel',
        'logo_hotel_name',
        'logo_hotel_url',
        'background_image_name',
        'background_image_url',
        'default_home',
        'address',
        'expired_date',
        'actived_at',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
        'is_active',
        'api_guest',
        'api_method',
        'api_secret',
        'is_midtrans',
        'midtrans_server_key',
        'midtrans_client_key',
        'is_midtrans_production',
        'pin',
        'version_data',
        'is_background_video',
        'background_video_name',
        'background_video_url',
      ],
      include: [
        {
          model: hotelChannel_0Entity,
          as: 'detail_channel_0',
          required: false,
          where: { is_active: true },
        },
      ],
      where: {
        id: id,
      },
      order: [this.sequelize.col('detail_channel_0.urutan')],
    });
    data.pin = '';
    return data;
  }

  async create(
    _iptv_feature: iptv_featureDtoInsert,
    req: any,
  ): Promise<iptv_feature> {
    let transaction = await this.sequelize.transaction();
    try {
      if (req.user.is_admin == undefined) {
        throw 'Akun anda tidak diperbolehkan menambah data ini';
      }
      if (req.user.is_admin == false) {
        throw 'Akun anda tidak diperbolehkan menambah data ini';
      }

      let { detail_channel_0, ...paramHotel } = _iptv_feature;
      paramHotel['is_active'] = true;
      paramHotel['created_by'] = req.user.username;
      paramHotel['updated_by'] = req.user.username;
      paramHotel['version_data'] = 0;

      const insertHotel = await this.iptv_featureModel.create(paramHotel, {
        transaction: transaction,
      });

      for (let i = 0; i < detail_channel_0.length; i++) {
        detail_channel_0[i]['id_hotel'] = insertHotel.id;
        detail_channel_0[i]['is_active'] = true;
        detail_channel_0[i]['created_by'] = req.user.username;
        const insertDetail = await this._hotelChannel_0Entity.create(
          detail_channel_0[i],
          { transaction: transaction },
        );
      }

      await transaction.commit();
      return insertHotel;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(
    id: number,
    _iptv_feature: iptv_featureDtoInsert,
    req: any,
  ): Promise<void> {
    let transaction = await this.sequelize.transaction();
    try {
      const cek = await this.iptv_featureModel.findOne({ where: { id: id } });
      if (cek == null) {
        throw 'Data tidak ditemukan';
      }

      let { detail_channel_0, ...paramHotel } = _iptv_feature;
      // _iptv_feature['version_data'] =
      //   typeof cek.version_data == 'string'
      //     ? parseInt(cek.version_data) + 1
      //     : cek.version_data + 1;
      paramHotel['updated_by'] = req.user.username;
      if (paramHotel.pin != undefined) {
        if (paramHotel.pin != null || paramHotel.pin != '') {
          paramHotel.pin = await bcrypt.hash(paramHotel.pin, 10);
        } else {
          delete paramHotel.pin;
        }
      }

      await this.iptv_featureModel.update(paramHotel, {
        where: {
          id: id,
        },
        transaction: transaction,
      });

      const deleteDetail = await this._hotelChannel_0Entity.destroy({
        where: { id_hotel: id },
        transaction: transaction,
      });
      for (let i = 0; i < detail_channel_0.length; i++) {
        detail_channel_0[i]['id_hotel'] = id;
        detail_channel_0[i]['is_active'] = true;
        detail_channel_0[i]['created_by'] = req.user.username;
        const insertDetail = await this._hotelChannel_0Entity.create(
          detail_channel_0[i],
          { transaction: transaction },
        );
      }

      await transaction.commit();

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'iptv_feature',
          'create',
        );
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: number, req: any): Promise<void> {
    const iptv_feature = await this.findOne(id);
    await iptv_feature.destroy();

    const deleteDetail = await this._hotelChannel_0Entity.destroy({
      where: { id_hotel: id },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'iptv_feature',
        'delete',
      );
    }
  }

  async updateVersionDataAllHotel(transaction: Transaction): Promise<any> {
    try {
      let getAll = await this.iptv_featureModel.findAll();

      for (let i = 0; i < getAll.length; i++) {
        let versionData = getAll[i].version_data + 1;

        let update = await this.iptv_featureModel.update(
          {
            version_data: versionData,
          },
          {
            where: { id: getAll[i].id },
            transaction: transaction,
          },
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
