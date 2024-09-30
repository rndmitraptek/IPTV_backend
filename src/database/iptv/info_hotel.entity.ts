import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'info_hotel' })
export class info_hotel extends Model<info_hotel> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id : number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_url : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_name : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title : string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description : string;

}