import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'role' })
export class role extends Model<role> { 

@ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_role : number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role : string;

}