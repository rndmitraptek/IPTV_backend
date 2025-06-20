import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { hotelDtoInsert } from './hotel.dto';
import * as bcrypt from 'bcrypt';
import { role } from 'src/database/iptv/role.entity';
import { role_menu } from 'src/database/iptv/role_menu.entity';

@Injectable({ scope: Scope.REQUEST })
export class HotelService {
  constructor(
    @InjectModel(iptv_feature)
    private iptv_featureModel: typeof iptv_feature,
    @InjectModel(role)
    private _role: typeof role,
    @InjectModel(role_menu)
    private _role_menu: typeof role_menu,
  ) {}

  findAll(req: any): Promise<iptv_feature[]> {
    try {
      return this.iptv_featureModel.findAll({ order: [['id', 'desc']] });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number): Promise<iptv_feature> {
    return this.iptv_featureModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(_iptv_feature: hotelDtoInsert, req: any): Promise<iptv_feature> {
    if (req.user.is_admin == undefined) {
      throw 'Akun anda tidak diperbolehkan menambah data ini';
    }
    if (req.user.is_admin == false) {
      throw 'Akun anda tidak diperbolehkan menambah data ini';
    }
    _iptv_feature['is_active'] = true;
    _iptv_feature['is_streaming'] = false;
    _iptv_feature['created_by'] = req.user.username;
    _iptv_feature['updated_by'] = req.user.username;
    if (_iptv_feature.pin != undefined) {
      if (_iptv_feature.pin != null) {
        _iptv_feature.pin = await bcrypt.hash(_iptv_feature.pin, 10);
      }
    }

    const hotel = await this.iptv_featureModel.create(_iptv_feature);

    //create role admin default
    const role = await this._role.create({
      role: 'admin',
      id_hotel: hotel.id,
    });

    //create role_menu default admin
    const menuArr = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29,
    ];
    for (let i = 0; i < menuArr.length; i++) {
      const roleMenu = await this._role_menu.create({
        id_role: role.id_role,
        id_menu: menuArr[i],
      });
    }

    return hotel;
  }

  async update(
    id: number,
    _iptv_feature: hotelDtoInsert,
    req: any,
  ): Promise<void> {
    _iptv_feature['updated_by'] = req.user.username;
    if (_iptv_feature.pin != undefined) {
      if (_iptv_feature.pin != null) {
        _iptv_feature.pin = await bcrypt.hash(_iptv_feature.pin, 10);
      }
    }

    await this.iptv_featureModel.update(_iptv_feature, {
      where: {
        id: id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const iptv_feature = await this.findOne(id);
    await iptv_feature.destroy();
  }
}
