import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';
import { users_deviceEntity } from './users_device.entity';
import { orderRestoDetailEntity } from './order_resto_detail.entity';

@Table({ tableName: 'order_resto', timestamps:true,updatedAt:'updated_at',createdAt:'created_at' })
export class orderRestoEntity extends Model<orderRestoEntity> { 
    
    @ApiHideProperty()
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    })
    id_order_resto:number;
    @HasMany(() => orderRestoDetailEntity, {
        foreignKey: 'id_order_resto',
        as: 'detail',
    })
    detail: orderRestoDetailEntity;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    order_date:Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    order_number:string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    @ForeignKey(() => iptv_feature)
    id_hotel: number;
    @BelongsTo(() => iptv_feature, {
        foreignKey: 'id_hotel',
        as: 'hotel',
    })
    hotel: iptv_feature;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    guest_name:string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    @ForeignKey(() => users_deviceEntity)
    id_user_device: number;
    @BelongsTo(() => users_deviceEntity, {
        foreignKey: 'id_user_device',
        as: 'user_device',
    })
    user_device: users_deviceEntity;

    @Column({
        type: DataType.NUMBER,
        allowNull: true,
    })
    diskon_persen:number;

    @Column({
        type: DataType.NUMBER,
        allowNull: true,
    })
    diskon_nominal:number;

    @Column({
        type: DataType.NUMBER,
        allowNull: true,
    })
    ppn_persen:number;

    @Column({
        type: DataType.NUMBER,
        allowNull: true,
    })
    ppn_nominal:number;

    @Column({
        type: DataType.NUMBER,
        allowNull: true,
    })
    grand_total:number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    status_bayar:number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    status_order:number;


    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at : Date;
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    updated_at : Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    created_by : string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    updated_by : string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    canceled_at : Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    canceled_by : string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    reason_canceled : string;

    
}