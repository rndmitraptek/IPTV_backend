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

@Table({ tableName: 'resto' })
export class resto extends Model<resto> {
  @ApiHideProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_resto: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  harga: number;

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

  @ForeignKey(() => restoGroupEntity)
  id_group: number;
  @BelongsTo(() => restoGroupEntity, {
    foreignKey: 'id_group',
    as: 'group',
  })
  group: restoGroupEntity;
}
