import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'menu' })
export class menu extends Model<menu> { 
    
    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_menu : number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    urut : number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    caption : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    icon : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    toggle_child : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    url : string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_parent : boolean;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id_parent : number;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_active : boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_admin : boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_client : boolean;
    
}