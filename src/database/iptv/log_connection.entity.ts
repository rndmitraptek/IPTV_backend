import { ApiHideProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'log_connection',
  timestamps: true,
  updatedAt: false,
  createdAt: 'created_at',
})
export class log_connectionEntity extends Model<log_connectionEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_log_connection: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_user_device: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status_connection: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;
}