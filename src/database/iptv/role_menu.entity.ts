import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { menu } from './menu.entity';

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
    @ForeignKey(() => menu)
    id_menu : number;
    @BelongsTo(() => menu, {
        foreignKey: 'id_menu',
        as: 'menu',
    })
    menu: menu;
    
}