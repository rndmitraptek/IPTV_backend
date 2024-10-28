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
import { users_deviceEntity } from './users_device.entity';
import { iptv_feature } from './iptv_feature.entity';
import { backgroundUserEntity } from './background_user.entity';

@Table({
  tableName: 'background',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class backgroundEntity extends Model<backgroundEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_background: number;
  @HasMany(() => backgroundUserEntity, {
    foreignKey: 'id_background',
    as: 'detail',
  })
  detail: backgroundUserEntity[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  background_name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  background_url: string;

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

  // @Column({
  //   type: DataType.BIGINT,
  //   allowNull: false,
  // })
  // @ForeignKey(() => users_deviceEntity)
  // id_user_device: number;
  // @BelongsTo(() => users_deviceEntity, {
  //   foreignKey: 'id_user_device',
  //   as: 'user_device',
  // })
  // user_device: users_deviceEntity;

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


  toJSON() {
    // Override untuk menambahkan `status_order_name` dalam output JSON
    const attributes = super.toJSON() as this;
    return { ...attributes};
  }
}
