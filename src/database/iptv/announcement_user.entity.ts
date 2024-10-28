import { ApiHideProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { users_deviceEntity } from './users_device.entity';
import { announcementEntity } from './announcement.entity';

@Table({
  tableName: 'announcement_user',
  timestamps: false
})
export class announcementUserEntity extends Model<announcementUserEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_announcement_user: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => announcementEntity)
  id_announcement: number;
  @BelongsTo(() => announcementEntity, {
    foreignKey: 'id_announcement',
    as: 'announcement',
  })
  announcement: announcementEntity;

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

}
