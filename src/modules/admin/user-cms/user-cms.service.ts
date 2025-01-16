import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { role } from 'src/database/iptv/role.entity';
import { users } from 'src/database/iptv/users.entity';
import { Sequelize } from 'sequelize-typescript';
import { usersCmsDtoInsert, usersCmsDtoUpdate } from './user-cms.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserCmsService {
  constructor(
    @InjectModel(users)
    private userModel: typeof users,
    @InjectModel(role)
    private roleModel: typeof role,
    @InjectModel(iptv_feature)
    private iptv_featureModel: typeof iptv_feature,
    private sequelize: Sequelize,
  ) {}

  findAll(req: any): Promise<users[]> {
    try {
      return this.userModel.findAll({
        attributes: [
          'id_user',
          'nama',
          'username',
          'id_role',
          'is_active',
          'is_admin',
          'id_hotel',
          [this.sequelize.col('role.role'), 'nama_role'],
          [this.sequelize.col('hotel.title_hotel'), 'nama_hotel'],
        ],
        include: [
          {
            attributes: [],
            model: role,
            as: 'role',
          },
          {
            attributes: [],
            model: iptv_feature,
            as: 'hotel',
          },
        ],
        order: [['id_user', 'desc']],
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number): Promise<users> {
    return this.userModel.findOne({
      where: {
        id_user: id,
      },
    });
  }

  async create(user: usersCmsDtoInsert, req: any): Promise<users> {
    const cekRoleAdmin = await this.roleModel.findOne({
      where: { id_hotel: user.id_hotel, role: 'admin' },
    });
    if (cekRoleAdmin && user.id_role == 0) {
      user.id_role = cekRoleAdmin.id_role;
    }

    user.password = await bcrypt.hash(user.password, 10);
    user['is_admin'] = false;
    user['is_active'] = true;
    return this.userModel.create(user);
  }

  async update(uuid: number, user: usersCmsDtoUpdate): Promise<void> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await this.userModel.update(user, {
      where: {
        id_user: uuid,
      },
    });
  }

  async remove(uuid: number): Promise<void> {
    const user = await this.findOne(uuid);
    if (user == null) {
      throw 'Data tidak ditemukan';
    }
    await this.userModel.update(
      { is_active: false },
      {
        where: {
          id_user: uuid,
        },
      },
    );
  }
}
