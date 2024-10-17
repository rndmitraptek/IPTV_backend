import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';

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