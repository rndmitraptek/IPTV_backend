import { ApiHideProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';
import { restoGroupEntity } from './resto_group.entity';
import { orderRestoEntity } from './order_resto.entity';
import { resto } from './resto.entity';

@Table({ tableName: 'order_resto_detail' })
export class orderRestoDetailEntity extends Model<orderRestoDetailEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_order_resto_detail: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => orderRestoEntity)
  id_order_resto: number;
  @BelongsTo(() => orderRestoEntity, {
    foreignKey: 'id_order_resto',
    as: 'order_resto',
  })
  order_resto: orderRestoEntity;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => resto)
  id_resto: number;
  @BelongsTo(() => resto, {
    foreignKey: 'id_resto',
    as: 'resto',
  })
  resto: resto;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  harga: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  qty: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  subtotal: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note: string;
}
