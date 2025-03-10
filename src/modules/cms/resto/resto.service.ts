import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { resto } from 'src/database/iptv/resto.entity';
import { restoDtoInsert } from './resto.dto';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { Sequelize } from 'sequelize-typescript';
import { restoGroupEntity } from 'src/database/iptv/resto_group.entity';
import { ApkService } from 'src/modules/tv/apk/apk.service';

@Injectable({ scope: Scope.REQUEST })
export class RestoService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(resto)
    private restoModel: typeof resto,
    private _ApkService: ApkService,
  ) {}

  findAll(req: any): Promise<resto[]> {
    try {
      return this.restoModel.findAll({
        attributes: [
          'id_resto',
          'image_name',
          'image_url',
          'title',
          'description',
          'harga',
          'is_sold_out',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'id_group',
          [this.sequelize.col('group.nama_group'), 'nama_group'],
        ],
        include: [
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
          {
            attributes: [],
            model: restoGroupEntity,
            as: 'group',
          },
        ],
        where: { id_hotel: req.user.id_hotel },
        group: [
          'id_resto',
          'image_name',
          'image_url',
          'title',
          'description',
          'harga',
          'is_sold_out',
          this.sequelize.col('resto.id_hotel'),
          this.sequelize.col('hotel.title_hotel'),
          this.sequelize.col('resto.id_group'),
          this.sequelize.col('group.nama_group'),
        ],
        order: [['id_resto', 'desc']],
      });
    } catch (error) {
      throw error;
    }
  }

  getByGroup(id_group: number, req: any): Promise<resto[]> {
    try {
      return this.restoModel.findAll({
        attributes: [
          'id_resto',
          'image_name',
          'image_url',
          'title',
          'description',
          'harga',
          'is_sold_out',
          'id_hotel',
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
          'id_group',
          [this.sequelize.col('group.nama_group'), 'nama_group'],
        ],
        include: [
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
          {
            attributes: [],
            model: restoGroupEntity,
            as: 'group',
          },
        ],
        where: {
          id_group: id_group,
          id_hotel: req.user.id_hotel,
        },
        group: [
          'id_resto',
          'image_name',
          'image_url',
          'title',
          'description',
          'harga',
          'is_sold_out',
          this.sequelize.col('resto.id_hotel'),
          this.sequelize.col('hotel.title_hotel'),
          this.sequelize.col('resto.id_group'),
          this.sequelize.col('group.nama_group'),
        ],
        order: [['id_resto', 'desc']],
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id_resto: number): Promise<resto> {
    return this.restoModel.findOne({
      where: {
        id_resto: id_resto,
      },
    });
  }

  async create(_resto: restoDtoInsert, req: any): Promise<resto> {
    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'resto',
        'create',
      );
    }

    _resto['id_hotel'] = req.user.id_hotel;
    return this.restoModel.create(_resto);
  }

  async update(
    id_resto: number,
    _resto: restoDtoInsert,
    req: any,
  ): Promise<void> {
    await this.restoModel.update(_resto, {
      where: {
        id_resto: id_resto,
      },
    });

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'resto',
        'update',
      );
    }
  }

  async remove(id_resto: number, req: any): Promise<void> {
    const resto = await this.findOne(id_resto);
    await resto.destroy();
    console.log(req.user);

    if (req.user.id_hotel != undefined) {
      let sendWS = await this._ApkService.sendWebsocketData(
        req,
        'resto',
        'delete',
      );
    }
  }
}
