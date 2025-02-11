import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'warning',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class warningEntity extends Model<warningEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_hotel: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  warning_text: string;

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
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  created_by: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updated_by: string;
}
