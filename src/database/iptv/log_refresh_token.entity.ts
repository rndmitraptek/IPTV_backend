import { ApiHideProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'log_refresh_token',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class logRefreshTokenEntity extends Model<logRefreshTokenEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_log_refresh: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_user_device: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  request: any;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  response: any;

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
}
