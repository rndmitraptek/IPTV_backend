import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'role_menu' })
export class role_menu extends Model<role_menu> { 

@ApiHideProperty()
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    })
    id_role_menu : number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id_role : number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id_menu : number;
    
}