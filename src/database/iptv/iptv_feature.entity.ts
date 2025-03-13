import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { hotelChannel_0Entity } from './hotel_channel_0.entity';

@Table({
  tableName: 'hotel',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class iptv_feature extends Model<iptv_feature> {
  @ApiHideProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @HasMany(() => hotelChannel_0Entity, {
    foreignKey: 'id_hotel',
    as: 'detail_channel_0',
  })
  detail_channel_0: hotelChannel_0Entity;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  video_splash_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  video_splash_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title_hotel: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo_hotel_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo_hotel_url: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_background_video: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  url_hotel: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  background_image_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  background_image_url: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  background_video_name: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  background_video_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  video_channel_0_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  video_channel_0_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  default_home: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expired_date: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  actived_at: Date;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  created_by: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  updated_by: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  api_method: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  api_guest: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  api_secret: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_midtrans: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  midtrans_server_key: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  midtrans_client_key: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_midtrans_production: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pin: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  version_data: number;
}
