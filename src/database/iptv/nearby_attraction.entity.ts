import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'nearby_attraction' })
export class nearby_attraction extends Model<nearby_attraction> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_nearby_attraction : number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_name : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_url : string;

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    url_location_qr : string;

}