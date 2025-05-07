import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { announcementEntity } from 'src/database/iptv/announcement.entity';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { insertAnnouncement } from './announcement.dto';
import { announcementUserEntity } from 'src/database/iptv/announcement_user.entity';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class AnnouncementService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(announcementEntity)
    private _announcementEntity: typeof announcementEntity,
    @InjectModel(announcementUserEntity)
    private _announcementUserEntity: typeof announcementUserEntity,
    private _ApkService: ApkService,
  ) {}

  async findAll(req: any): Promise<any> {
    try {
      let datas = await this._announcementEntity.findAll({
        attributes: [
          'id_announcement',
          'description',
          [
            this.sequelize.literal("start_date + INTERVAL '7 HOURS'"),
            'start_date',
          ],
          [this.sequelize.literal("end_date + INTERVAL '7 HOURS'"), 'end_date'],
          'is_active',
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
              'id_announcement_user',
              'id_announcement',
              'id_user_device',
            ],
            model: announcementUserEntity,
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
        order: [['id_announcement', 'desc']],
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
    let data = await this._announcementEntity.findOne({
      attributes: [
        'id_announcement',
        'description',
        [
          this.sequelize.literal("start_date + INTERVAL '7 HOURS'"),
          'start_date',
        ],
        [this.sequelize.literal("end_date + INTERVAL '7 HOURS'"), 'end_date'],
        'is_active',
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
            'id_announcement_user',
            'id_announcement',
            'id_user_device',
          ],
          model: announcementUserEntity,
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
        id_announcement: id,
        is_active: true,
      },
    });

    return {
      ...data.get(),
      id_user_device: data.detail.map((item) => item.id_user_device.toString()),
      room_id: data.detail.map((item) => item.user_device.room_id.toString()),
    };
  }

  async create(
    _announcementEntity: insertAnnouncement,
    req: any,
  ): Promise<any> {
    let transaction = await this.sequelize.transaction();
    try {
      if (req.user.id_hotel == undefined) {
        throw 'Akun anda tidak memiliki hotel';
      }

      _announcementEntity['created_by'] = req.user.username;
      _announcementEntity['updated_by'] = req.user.username;
      _announcementEntity['id_hotel'] = req.user.id_hotel;
      _announcementEntity['is_active'] = true;

      if (_announcementEntity.detail_room.length == 0) {
        throw 'detail room tidak boleh kosong';
      }

      let insertHeader = await this._announcementEntity.create(
        _announcementEntity,
        { transaction: transaction },
      );
      if (!insertHeader) {
        throw 'insert gagal';
      }

      for (let i = 0; i < _announcementEntity.detail_room.length; i++) {
        let insertDetail = await this._announcementUserEntity.create(
          {
            id_announcement: insertHeader.id_announcement,
            id_user_device: _announcementEntity.detail_room[i].id_user_device,
          },
          {
            fields: ['id_announcement', 'id_user_device'],
            transaction: transaction,
          },
        );
        if (!insertDetail) {
          throw 'insert gagal';
        }
      }
      await transaction.commit();

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'announcement',
          'create',
        );
      }

      return 'success';
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(
    id: number,
    _announcementEntity: insertAnnouncement,
    req: any,
  ): Promise<any> {
    let transaction = await this.sequelize.transaction();
    try {
      _announcementEntity['updated_by'] = req.user.username;
      await this._announcementEntity.update(_announcementEntity, {
        where: {
          id_announcement: id,
        },
      });

      let deleteUser = await this._announcementUserEntity.destroy({
        where: { id_announcement: id },
      });

      for (let i = 0; i < _announcementEntity.detail_room.length; i++) {
        let insertDetail = await this._announcementUserEntity.create(
          {
            id_announcement: id,
            id_user_device: _announcementEntity.detail_room[i].id_user_device,
          },
          {
            fields: ['id_announcement', 'id_user_device'],
            transaction: transaction,
          },
        );
        if (!insertDetail) {
          throw 'update gagal';
        }
      }
      await transaction.commit();

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'announcement',
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
    id_announcement: number,
    req: any,
  ): Promise<announcementEntity> {
    try {
      let data = await this._announcementEntity.findOne({
        where: {
          id_announcement: id_announcement,
        },
      });
      data.update({
        is_active: !data.is_active,
      });

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'announcement',
          'update',
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
