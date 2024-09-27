import { Injectable, Scope } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { schema_model } from "./crud.model";

@Injectable({ scope: Scope.REQUEST})
export class crudRepository {
    constructor(
        private sequelize: Sequelize
    ) { }

    async getSchemaByTabel(tabel_name:string): Promise<schema_model[]>{
        try {
            return await this.sequelize.query(
                `SELECT ordinal_position,column_name, data_type
                FROM information_schema.columns
                WHERE table_name =:tabel_name  order by ordinal_position`,
                {
                    replacements: {
                        tabel_name:tabel_name
                    },
                    type: QueryTypes.SELECT
                })
        } catch (error) {
            throw error;
        }
    }
}