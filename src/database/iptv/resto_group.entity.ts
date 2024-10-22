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

@Table({ tableName: 'resto_group' ,timestamps:true,updatedAt:'updated_at',createdAt:'created_at'})
export class restoGroupEntity extends Model<restoGroupEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_group: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama_group: string;

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
}
