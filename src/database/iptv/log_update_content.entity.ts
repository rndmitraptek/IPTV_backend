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
  tableName: 'log_update_content',
  timestamps: true,
  updatedAt: false,
  createdAt: 'created_at',
})
export class log_update_contentEntity extends Model<log_update_contentEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_user_device: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  module: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  action: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;
}
