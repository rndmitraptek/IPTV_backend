
import { Injectable, Scope } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable({ scope: Scope.REQUEST})
export class role_menuRepository {
    constructor(
        private sequelize: Sequelize
    ) { }

    async GetAll(): Promise<any>{
        try {
            let query = `select rm.*,r.role,m.caption
                        from role_menu rm
                        inner join role r on rm.id_role=r.id_role
                        inner join menu m on m.id_menu=rm.id_menu ;`
            return await this.sequelize.query(query, {
                type: QueryTypes.SELECT
            });
        } catch (error) {
            throw error;
        }
    }

    async GetByIdRole(id_role:number): Promise<any>{
        try {
            let query = `select rm.*,r.role,m.caption
                        from role_menu rm
                        inner join role r on rm.id_role=r.id_role
                        inner join menu m on m.id_menu=rm.id_menu where r.id_role=${id_role} ;`
            return await this.sequelize.query(query, {
                type: QueryTypes.SELECT
            });
        } catch (error) {
            throw error;
        }
    }

}
            