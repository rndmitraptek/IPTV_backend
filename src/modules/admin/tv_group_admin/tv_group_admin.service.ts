import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { AppGateway } from 'src/utility/websocket.helper';
import {
  tv_groupAdminDtoInsert,
  tv_groupAdminDtoUpdate,
} from './tv_group_admin.dto';

@Injectable({ scope: Scope.REQUEST })
export class TvGroupAdminService {
  constructor(
    @InjectModel(tv_group)
    private tv_groupModel: typeof tv_group,
    private _AppGateway: AppGateway,
  ) {}

  findAll(id_hotel: number): Promise<tv_group[]> {
    try {
      return this.tv_groupModel.findAll({ where: { id_hotel: id_hotel } });
    } catch (error) {
      throw error;
    }
  }

  findOne(id_group: number, id_hotel: number): Promise<tv_group> {
    return this.tv_groupModel.findOne({
      where: {
        id_group: id_group,
        id_hotel: id_hotel,
      },
    });
  }

  async create(_tv_group: tv_groupAdminDtoInsert): Promise<tv_group> {
    const payloadData = {
      id_hotel: _tv_group.id_hotel,
      module: 'tv_group',
      action: 'create',
    };
    let send = this._AppGateway.handleMessageUpdateData(payloadData);

    return this.tv_groupModel.create(_tv_group);
  }

  async update(
    id_group: number,
    _tv_group: tv_groupAdminDtoUpdate,
  ): Promise<void> {
    await this.tv_groupModel.update(_tv_group, {
      where: {
        id_group: id_group,
      },
    });

    const payloadData = {
      id_hotel: _tv_group.id_hotel,
      module: 'tv_group',
      action: 'update',
    };
    let send = this._AppGateway.handleMessageUpdateData(payloadData);
  }

  async remove(id_group: number): Promise<void> {
    const tv_group = await this.tv_groupModel.findOne({
      where: {
        id_group: id_group,
      },
    });
    await tv_group.destroy();

    const payloadData = {
      id_hotel: tv_group.id_hotel,
      module: 'tv_group',
      action: 'delete',
    };
    let send = this._AppGateway.handleMessageUpdateData(payloadData);
  }
}
