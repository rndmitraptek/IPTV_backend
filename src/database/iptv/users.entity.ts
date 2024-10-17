import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';

@Table({ tableName: 'users' })
export class users extends Model<users> {
    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_user : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nama: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id_role: number;

    @Column({
        type: DataType.BOOLEAN,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_admin: boolean;


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