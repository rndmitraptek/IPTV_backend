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

@Table({
  tableName: 'hotel_channel_0',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class hotelChannel_0Entity extends Model<hotelChannel_0Entity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_hotel_channel_0: string;

  @Column({
    type: DataType.INTEGER,
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
    allowNull: false,
  })
  video_channel_0_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  video_channel_0_url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  urutan: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  created_by: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updated_by: string;
}
