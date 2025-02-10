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
  tableName: 'log_logout',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class logLogoutEntity extends Model<logLogoutEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_log_logout: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  message: string;

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
