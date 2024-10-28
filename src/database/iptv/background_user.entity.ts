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
import { backgroundEntity } from './background.entity';

@Table({
  tableName: 'background_user',
  timestamps: false
})
export class backgroundUserEntity extends Model<backgroundUserEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_background_user: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => backgroundEntity)
  id_background: number;
  @BelongsTo(() => backgroundEntity, {
    foreignKey: 'id_background',
    as: 'background',
  })
  background: backgroundEntity;

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
