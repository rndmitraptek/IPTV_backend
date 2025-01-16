import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { users_guestEntity } from 'src/database/iptv/users_guest.entity';
import { userGuestInsert } from './userGuest.dto';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class userGuestService {
  constructor(
    @InjectModel(users_guestEntity)
    private _users_guestEntity: typeof users_guestEntity,
    private _ApkService: ApkService,
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
