import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { Sequelize } from 'sequelize-typescript';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { sessionDeviceEntity } from 'src/database/iptv/session_device.entity';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { createUserDeviceRoom, updateUserDeviceRoom } from './user-device.dto';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserDeviceService {
  constructor(
    @InjectModel(users_deviceEntity)
    private _users_deviceEntity: typeof users_deviceEntity,
    @InjectModel(sessionDeviceEntity)
    private _sessionDeviceEntity: typeof sessionDeviceEntity,
    @InjectModel(iptv_feature)
    private _hotelEntity: typeof iptv_feature,
    private sequelize: Sequelize,
  ) {}

  async getUserRoom(req: any): Promise<any> {
    try {
      let data = await this._users_deviceEntity.findAll({
        attributes: [
          'id_user_device',
          'username',
          'room_id',
          'is_active',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'created_at',
          'created_by',
        ],
        include: [
          {
            attributes: ['nama_tamu', 'start_date', 'end_date', 'is_active'],
            model: users_guestEntity,
            as: 'guest',
          },
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
        ],
        where: {
          is_active: true,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id_user_device: number, req: any): Promise<any> {
    try {
      let data = await this._users_deviceEntity.findOne({
        attributes: [
          'id_user_device',
          'username',
          'room_id',
          'device_info',
          'is_active',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'created_at',
          'created_by',
        ],
        include: [
          {
            attributes: ['nama_tamu', 'start_date', 'end_date', 'is_active'],
            model: users_guestEntity,
            as: 'guest',
          },
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
        ],
        where: {
          id_user_device: id_user_device,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insertUserRoom(param: createUserDeviceRoom, req: any): Promise<any> {
    try {
      if (req.user.is_admin == undefined) {
        throw 'Akun anda tidak diperbolehkan menambah data';
      }
      if (req.user.is_admin == false) {
        throw 'Akun anda tidak diperbolehkan menambah data';
      }
      let cekDuplicateUser = await this._users_deviceEntity.findOne({
        where: { username: param.username },
      });
      if (cekDuplicateUser != null) {
        throw 'Username sudah digunakan';
      }

      param.password = await bcrypt.hash(param.password, 10);
      let insert = await this._users_deviceEntity.create(
        {
          username: param.username,
          room_id: param.room_id,
          password: param.password,
          id_hotel: param.id_hotel,
          is_active: true,
          created_by: req.user.username,
        },
        {
          fields: [
            'username',
            'room_id',
            'password',
            'id_hotel',
            'is_active',
            'created_by',
          ],
        },
      );
      if (!insert) {
        throw 'Tambah akun room device gagal';
      }

      return insert;
    } catch (error) {
      throw error;
    }
  }

  async updateUserRoom(param: updateUserDeviceRoom, req: any): Promise<any> {
    try {
      let cekDuplicateUser = await this._users_deviceEntity.findOne({
        where: {
          username: param.username,
          id_user_device: { [Op.ne]: param.id_user_device },
        },
      });
      if (cekDuplicateUser != null) {
        throw 'Username sudah digunakan';
      }

      let cek_sess = await this._sessionDeviceEntity.findOne({
        where: { id_user_device: param.id_user_device },
      });
      if (cek_sess != null) {
        let del_sess = await this._sessionDeviceEntity.destroy({
          where: { id_user_device: param.id_user_device },
        });
        if (!del_sess) {
          throw 'session remove failed';
        }
      }

      if (
        param.password != undefined &&
        param.password != '' &&
        param.password != null
      ) {
        param.password = await bcrypt.hash(param.password, 10);
        let update = await this._users_deviceEntity.update(
          {
            username: param.username,
            room_id: param.room_id,
            password: param.password,
            updated_by: req.user.username,
          },
          {
            where: { id_user_device: param.id_user_device },
          },
        );
        if (!update) {
          throw 'Update akun room device gagal';
        }
      } else {
        let update = await this._users_deviceEntity.update(
          {
            username: param.username,
            room_id: param.room_id,
            updated_by: req.user.username,
          },
          {
            where: { id_user_device: param.id_user_device },
          },
        );
        if (!update) {
          throw 'Update akun room device gagal';
        }
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  }

  async deactived(id_user_device: number, req: any): Promise<any> {
    try {
      let update = await this._users_deviceEntity.update(
        {
          is_active: false,
          updated_by: req.user.username,
        },
        {
          where: { id_user_device: id_user_device },
        },
      );
      if (!update) {
        throw 'Deactived akun room device gagal';
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  }

  async actived(id_user_device: number, req: any): Promise<any> {
    try {
      let update = await this._users_deviceEntity.update(
        {
          is_active: true,
          updated_by: req.user.username,
        },
        {
          where: { id_user_device: id_user_device },
        },
      );
      if (!update) {
        throw 'Actived akun room device gagal';
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  }
}
