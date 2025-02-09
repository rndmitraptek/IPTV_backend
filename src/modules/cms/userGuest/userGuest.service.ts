import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';
import { userGuestInsert, userGuestMulti } from './userGuest.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable({ scope: Scope.REQUEST })
export class userGuestService {
  constructor(
    @InjectModel(users_guestEntity)
    private _users_guestEntity: typeof users_guestEntity,
    private _ApkService: ApkService,
    private sequelize: Sequelize,
  ) {}

  async create(_param: userGuestInsert, req: any): Promise<users_guestEntity> {
    const updateNonActive = await this._users_guestEntity.update(
      {
        is_active: false,
      },
      {
        where: {
          id_user_device: _param.id_user_device,
        },
      },
    );

    _param.start_date = new Date(
      new Date(_param.start_date).getTime() - 7 * 60 * 60 * 1000,
    );
    _param.end_date = new Date(
      new Date(_param.end_date).getTime() - 7 * 60 * 60 * 1000,
    );
    _param['created_by'] = req.user.username;
    _param['id_hotel'] = req.user.id_hotel;
    _param['is_active'] = true;

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'user_guest',
        'create',
      );
    }

    return this._users_guestEntity.create(_param);
  }

  async createMulti(_param: userGuestMulti, req: any): Promise<void> {
    let transaction = await this.sequelize.transaction();
    try {
      for (let i = 0; i < _param.detail.length; i++) {
        const updateNonActive = await this._users_guestEntity.update(
          {
            is_active: false,
          },
          {
            where: {
              id_user_device: _param.detail[i].id_user_device,
            },
          },
        );

        _param.detail[i].start_date = new Date(
          new Date(_param.detail[i].start_date).getTime() - 7 * 60 * 60 * 1000,
        );
        _param.detail[i].end_date = new Date(
          new Date(_param.detail[i].end_date).getTime() - 7 * 60 * 60 * 1000,
        );
        _param.detail[i]['created_by'] = req.user.username;
        _param.detail[i]['id_hotel'] = req.user.id_hotel;
        _param.detail[i]['is_active'] = true;

        const insert = await this._users_guestEntity.create(_param.detail[i]);
      }

      if (req.user.id_hotel != undefined) {
        let sendWS = await this._ApkService.sendWebsocketData(
          req,
          'user_guest',
          'create',
        );
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id_user_guest: number, req: any): Promise<void> {
    await this._users_guestEntity.update(
      {
        is_active: false,
        updated_by: req.user.username,
      },
      {
        where: {
          id_user_guest: id_user_guest,
        },
      },
    );

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'user_guest',
        'delete',
      );
    }
  }
}
