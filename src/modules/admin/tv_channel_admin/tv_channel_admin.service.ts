import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { tv_channel } from 'src/database/iptv/tv_channel.entity';
import { AppGateway } from 'src/utility/websocket.helper';
import { tv_channelAdminRepository } from './tv_channel_admin.repo';
import { IptvFeatureService } from 'src/modules/cms/iptv_feature/iptv_feature.service';
import {
  tv_channelAdminDtoInsert,
  tv_channelAdminDtoUpdateUrut,
} from './tv_channel_admin.dto';

@Injectable({ scope: Scope.REQUEST })
export class TvChannelAdminService {
  constructor(
    @InjectModel(tv_channel)
    private tv_channelModel: typeof tv_channel,
    private _tv_channelAdminRepository: tv_channelAdminRepository,
    // private _IptvFeatureService: IptvFeatureService,
    private readonly sequelize: Sequelize,
    private _AppGateway: AppGateway,
  ) {}

  async updateUrutan(
    param: tv_channelAdminDtoUpdateUrut[],
  ): Promise<tv_channelAdminDtoUpdateUrut[]> {
    let transaction = await this.sequelize.transaction();
    try {
      for (const detail of param) {
        await this.tv_channelModel.update(
          {
            urut: detail.urut,
          },
          {
            where: {
              id_channel: detail.id_channel,
            },
            transaction: transaction,
          },
        );
      }

      //   let updateVersionDataAllHotel =
      //     await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

      transaction.commit();

      const payloadData = {
        id_hotel: 0,
        module: 'tv_channel',
        action: 'update',
      };
      let send = this._AppGateway.handleMessageUpdateData(payloadData);

      return param;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async updateStatusActive(id_channel: number): Promise<tv_channel> {
    let transaction = await this.sequelize.transaction();
    try {
      let data = await this.tv_channelModel.findOne({
        where: {
          id_channel: id_channel,
        },
      });
      data.update({
        is_active: !data.is_active,
      });

      //   let updateVersionDataAllHotel =
      //     await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

      transaction.commit();

      const payloadData = {
        id_hotel: 0,
        module: 'tv_channel',
        action: 'update',
      };
      let send = this._AppGateway.handleMessageUpdateData(payloadData);
      return data;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async updateStatusAssign(id_channel: number): Promise<tv_channel> {
    let transaction = await this.sequelize.transaction();
    try {
      let data = await this.tv_channelModel.findOne({
        where: {
          id_channel: id_channel,
        },
      });
      data.update({
        is_assign: !data.is_assign,
      });

      //   let updateVersionDataAllHotel =
      //     await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

      transaction.commit();

      const payloadData = {
        id_hotel: 0,
        module: 'tv_channel',
        action: 'update',
      };
      let send = this._AppGateway.handleMessageUpdateData(payloadData);
      return data;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  findAll(id_hotel: number): Promise<tv_channel[]> {
    try {
      return this._tv_channelAdminRepository.GetAll(id_hotel);
    } catch (error) {
      throw error;
    }
  }

  findOne(id_group: number, id_hotel: number): Promise<tv_channel> {
    return this._tv_channelAdminRepository.GetByIdGroup(id_group, id_hotel);
  }

  async create(_tv_channel: tv_channelAdminDtoInsert): Promise<tv_channel> {
    let transaction = await this.sequelize.transaction();
    try {
      let urut = 1;
      let last_urut = await this.tv_channelModel.findOne({
        order: [['urut', 'DESC']],
      });
      if (last_urut) {
        urut = last_urut.urut + 1;
      }
      _tv_channel.urut = urut;
      let insert = await this.tv_channelModel.create(_tv_channel);

      //   let updateVersionDataAllHotel =
      //     await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

      transaction.commit();

      const payloadData = {
        id_hotel: 0,
        module: 'tv_channel',
        action: 'create',
      };
      let send = this._AppGateway.handleMessageUpdateData(payloadData);
      return insert;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async update(
    id_channel: string,
    _tv_channel: tv_channelAdminDtoInsert,
  ): Promise<void> {
    let transaction = await this.sequelize.transaction();
    try {
      await this.tv_channelModel.update(_tv_channel, {
        where: {
          id_channel: id_channel,
        },
        transaction: transaction,
      });

      //   let updateVersionDataAllHotel =
      //     await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

      transaction.commit();

      const payloadData = {
        id_hotel: 0,
        module: 'tv_channel',
        action: 'update',
      };
      let send = this._AppGateway.handleMessageUpdateData(payloadData);
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async remove(id_channel: number): Promise<void> {
    let transaction = await this.sequelize.transaction();
    try {
      const tv_channel = await this.tv_channelModel.findOne({
        where: {
          id_channel: id_channel,
        },
      });
      await tv_channel.destroy();

      //   let updateVersionDataAllHotel =
      //     await this._IptvFeatureService.updateVersionDataAllHotel(transaction);

      transaction.commit();

      const payloadData = {
        id_hotel: 0,
        module: 'tv_channel',
        action: 'delete',
      };
      let send = this._AppGateway.handleMessageUpdateData(payloadData);
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
}
