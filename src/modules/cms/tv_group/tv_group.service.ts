import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { tv_group } from 'src/database/iptv/tv_group.entity';
import { tv_groupDtoInsert, tv_groupDtoUpdate } from './tv_group.dto';
import { AppGateway } from 'src/utility/websocket.helper';

@Injectable({ scope: Scope.REQUEST })
export class TvGroupService {
  constructor(
    @InjectModel(tv_group)
    private tv_groupModel: typeof tv_group,
    private _AppGateway: AppGateway,
  ) {}

  findAll(): Promise<tv_group[]> {
    try {
      return this.tv_groupModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id_group: number): Promise<tv_group> {
    return this.tv_groupModel.findOne({
      where: {
        id_group: id_group,
      },
    });
  }

  async create(_tv_group: tv_groupDtoInsert): Promise<tv_group> {
    const payloadData = {
      id_hotel: 0,
      module: 'tv_group',
      action: 'create',
    };
    let send = this._AppGateway.handleMessageUpdateData(payloadData);

    return this.tv_groupModel.create(_tv_group);
  }

  async update(id_group: number, _tv_group: tv_groupDtoUpdate): Promise<void> {
    await this.tv_groupModel.update(_tv_group, {
      where: {
        id_group: id_group,
      },
    });

    const payloadData = {
      id_hotel: 0,
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
      id_hotel: 0,
      module: 'tv_group',
      action: 'delete',
    };
    let send = this._AppGateway.handleMessageUpdateData(payloadData);
  }
}
