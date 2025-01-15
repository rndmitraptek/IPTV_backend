import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { backgroundEntity } from 'src/database/iptv/background.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { BuckectName } from 'src/utility/constant';
import { MinioClientService } from 'src/utility/minio-client.utils';
import { insertBackground } from './background.dto';
import { BufferedFile } from 'src/utility/minio-client.model';
import { backgroundUserEntity } from 'src/database/iptv/background_user.entity';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class BackgroundService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(backgroundEntity)
    private _backgroundEntity: typeof backgroundEntity,
    @InjectModel(backgroundUserEntity)
    private _backgroundUserEntity: typeof backgroundUserEntity,
    private MinioClientService: MinioClientService,
    private _ApkService: ApkService,
  ) {}

  async findAll(req: any): Promise<any> {
    try {
      let datas = await this._backgroundEntity.findAll({
        attributes: [
          'id_background',
          'background_url',
          'background_name',
          'background_video_name',
          'background_video_url',
          'start_date',
          'end_date',
          'is_active',
          'is_video',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
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
          {
            attributes: [
              'id_background_user',
              'id_background',
              'id_user_device',
            ],
            model: backgroundUserEntity,
            as: 'detail',
            include: [
              {
                attributes: ['room_id'],
                model: users_deviceEntity,
                as: 'user_device',
              },
            ],
          },
        ],
        where: { id_hotel: req.user.id_hotel, is_active: true },
        order: [['id_background', 'desc']],
      });

      return datas.map((data) => ({
        ...data.get(),
        id_user_device: data.detail.map((item) =>
          item.id_user_device.toString(),
        ),
        room_id: data.detail.map((item) => item.user_device.room_id.toString()),
      }));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    let data = await this._backgroundEntity.findOne({
      attributes: [
        'id_background',
        'background_url',
        'background_name',
        'background_video_name',
        'background_video_url',
        'start_date',
        'end_date',
        'is_active',
        'is_video',
        'id_hotel',
        [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
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
        {
          attributes: ['id_background_user', 'id_background', 'id_user_device'],
          model: backgroundUserEntity,
          as: 'detail',
          include: [
            {
              attributes: ['room_id'],
              model: users_deviceEntity,
              as: 'user_device',
            },
          ],
        },
      ],
      where: {
        id_background: id,
        is_active: true,
      },
    });

    return {
      ...data.get(),
      id_user_device: data.detail.map((item) => item.id_user_device.toString()),
      room_id: data.detail.map((item) => item.user_device.room_id.toString()),
    };
  }

  async create(_param: insertBackground, req: any): Promise<any> {
    let transaction = await this.sequelize.transaction();
    try {
      if (req.user.id_hotel == undefined) {
        throw 'Akun anda tidak memiliki hotel';
      }

      _param['created_by'] = req.user.username;
      _param['updated_by'] = req.user.username;
      _param['id_hotel'] = req.user.id_hotel;
      _param['is_active'] = true;

      if (_param.detail_room.length == 0) {
        throw 'detail room tidak boleh kosong';
      }

      let insertHeader = await this._backgroundEntity.create(_param, {
        transaction: transaction,
      });
      if (!insertHeader) {
        throw 'insert gagal';
      }

      for (let i = 0; i < _param.detail_room.length; i++) {
        let insertDetail = await this._backgroundUserEntity.create(
          {
            id_background: insertHeader.id_background,
            id_user_device: _param.detail_room[i].id_user_device,
          },
          {
            fields: ['id_background', 'id_user_device'],
            transaction: transaction,
          },
        );
        if (!insertDetail) {
          throw 'insert gagal';
        }
      }

      await transaction.commit();

      if (req.user.id_hotel != undefined) {
        let sendWS = this._ApkService.sendWebsocketData(
          req,
          'background',
          'create',
        );
      }

      return 'success';
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: number, _param: insertBackground, req: any): Promise<any> {
    let transaction = await this.sequelize.transaction();
    try {
      _param['updated_by'] = req.user.username;
      await this._backgroundEntity.update(_param, {
        where: {
          id_background: id,
        },
      });

      let deleteUser = await this._backgroundUserEntity.destroy({
        where: { id_background: id },
      });
      if (!deleteUser) {
        throw 'update gagal';
      }
      for (let i = 0; i < _param.detail_room.length; i++) {
        let insertDetail = await this._backgroundUserEntity.create(
          {
            id_background: id,
            id_user_device: _param.detail_room[i].id_user_device,
          },
          {
            fields: ['id_background', 'id_user_device'],
            transaction: transaction,
          },
        );
        if (!insertDetail) {
          throw 'update gagal';
        }
      }
      await transaction.commit();

      if (req.user.id_hotel != undefined) {
        let sendWS = this._ApkService.sendWebsocketData(
          req,
          'background',
          'update',
        );
      }

      return 'success';
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateStatusActive(
    id_background: number,
    req: any,
  ): Promise<backgroundEntity> {
    try {
      let data = await this._backgroundEntity.findOne({
        where: {
          id_background: id_background,
        },
      });
      data.update({
        is_active: !data.is_active,
      });

      if (req.user.id_hotel != undefined) {
        let sendWS = this._ApkService.sendWebsocketData(
          req,
          'background',
          'update',
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
