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
import { greeting_card } from './greeting_card.entity';

@Table({
  tableName: 'greeting_card_user',
  timestamps: false
})
export class greeting_cardUserEntity extends Model<greeting_cardUserEntity> {
  @ApiHideProperty()
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id_greeting_card_user: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  @ForeignKey(() => greeting_card)
  id_greeting_card: number;
  @BelongsTo(() => greeting_card, {
    foreignKey: 'id_greeting_card',
    as: 'greeting_card',
  })
  greeting_card: greeting_card;

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
