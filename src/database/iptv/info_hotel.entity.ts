import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';

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



    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    @ForeignKey(() => iptv_feature)
    id_hotel:number;
    @BelongsTo(() => iptv_feature, {
        foreignKey: 'id_hotel',
        as: 'hotel',
    })
    hotel: iptv_feature;
}