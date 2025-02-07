import { Injectable, Scope } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable({ scope: Scope.REQUEST })
export class tv_channelAdminRepository {
  constructor(private sequelize: Sequelize) {}

  async GetAll(id_hotel: number): Promise<any> {
    try {
      let query = `select tv.*,tg."group"
                        from tv_channel tv
                        inner join tv_group tg on tv.id_group=tg.id_group 
                        where tv.id_hotel=${id_hotel}
                        order by tv.urut;`;
      return await this.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (error) {
      throw error;
    }
  }

  async GetByIdGroup(id_group: number, id_hotel: number): Promise<any> {
    try {
      let query = `select tv.*,tg."group"
                        from tv_channel tv
                        inner join tv_group tg on tv.id_group=tg.id_group 
                        where tg.id_group=${id_group} AND tv.id_hotel=${id_hotel}
                        order by tv.urut;`;
      return await this.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (error) {
      throw error;
    }
  }
}
