
import { Injectable, Scope } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable({ scope: Scope.REQUEST})
export class tv_channelRepository {
    constructor(
        private sequelize: Sequelize
    ) { }

    async GetAll(): Promise<any>{
        try {
            let query = `select tv.*,tg."group"
                        from tv_channel tv
                        inner join tv_group tg on tv.id_group=tg.id_group order by tv.urut;`
            return await this.sequelize.query(query, {
                type: QueryTypes.SELECT
            });
        } catch (error) {
            throw error;
        }
    }


    async GetChannelActive(): Promise<any>{
        try {
            let query = `select tv.*,tg."group"
                        from tv_channel tv
                        inner join tv_group tg on tv.id_group=tg.id_group 
                        WHERE is_active=true AND is_assign=true
                        order by tv.urut;`
            return await this.sequelize.query(query, {
                type: QueryTypes.SELECT
            });
        } catch (error) {
            throw error;
        }
    }

    async GetByIdGroup(id_group:number): Promise<any>{
        try {
            let query = `select tv.*,tg."group"
                        from tv_channel tv
                        inner join tv_group tg on tv.id_group=tg.id_group where tg.id_group=${id_group} order by tv.urut;`
            return await this.sequelize.query(query, {
                type: QueryTypes.SELECT
            });
        } catch (error) {
            throw error;
        }
    }
}