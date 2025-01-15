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
import { users_deviceEntity } from './users_device.entity';

@Table({
  tableName: 'users_guest',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class users_guestEntity extends Model<users_guestEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_user_guest: number;

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
    type: DataType.STRING,
    allowNull: false,
  })
  nama_tamu: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

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
    allowNull: true,
  })
  updated_by: string;
}
