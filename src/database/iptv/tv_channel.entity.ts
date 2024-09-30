import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'tv_channel' })
export class tv_channel extends Model<tv_channel> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_channel : number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id_group : number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    urut : number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title_channel : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    icon_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    icon_name : string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_active : boolean;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_assign : boolean;
    
}