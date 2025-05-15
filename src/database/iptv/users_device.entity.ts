import { ApiHideProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';
import { users_guestEntity } from './users_guest.entity';
import { log_connectionEntity } from './log_connection.entity';

@Table({
  tableName: 'users_device',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class users_deviceEntity extends Model<users_deviceEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_user_device: number;
  @HasOne(() => users_guestEntity, {
    foreignKey: 'id_user_device',
    as: 'guest',
  })
  guest: users_guestEntity;
  @HasMany(() => log_connectionEntity, {
    foreignKey: 'id_user_device',
    as: 'log_connection',
  })
  log_connection: log_connectionEntity;

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
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  room_id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wifi: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wifi_password: string;

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
    type: DataType.JSON,
    allowNull: false,
  })
  device_info: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  token_access: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status_connection: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_connected: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_disconnected: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  update_content_module: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  update_content_action: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_update_content: Date;
}
