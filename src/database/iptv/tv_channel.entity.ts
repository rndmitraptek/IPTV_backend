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

@Table({ tableName: 'tv_channel' })
export class tv_channel extends Model<tv_channel> {
  @ApiHideProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_channel: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_group: number;

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
    type: DataType.INTEGER,
    allowNull: false,
  })
  urut: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title_channel: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon_name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_assign: boolean;
}
