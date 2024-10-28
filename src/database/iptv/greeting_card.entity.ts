import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';
import { users_deviceEntity } from './users_device.entity';
import { greeting_cardUserEntity } from './greeting_card_user.entity';

@Table({ tableName: 'greeting_card' })
export class greeting_card extends Model<greeting_card> { 
    
    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_greeting_card : number;
    @HasMany(() => greeting_cardUserEntity, {
        foreignKey: 'id_greeting_card',
        as: 'detail',
      })
      detail: greeting_cardUserEntity[];
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video_name : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    no_room : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    start_date : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    end_date : string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue:true
    })
    is_active : boolean;
    

    
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    @ForeignKey(() => iptv_feature)
    id_hotel:number;
    @BelongsTo(() => iptv_feature, {
        foreignKey: 'id_hotel',
        as: 'hotel',
    })
    hotel: iptv_feature;


    // @Column({
    //     type: DataType.BIGINT,
    //     allowNull: false
    // })
    // @ForeignKey(() => users_deviceEntity)
    // id_user_device:number;
    // @BelongsTo(() => users_deviceEntity, {
    //     foreignKey: 'id_user_device',
    //     as: 'user_device',
    // })
    // user_device: users_deviceEntity;


    toJSON() {
        // Override untuk menambahkan `status_order_name` dalam output JSON
        const attributes = super.toJSON() as this;
        return { ...attributes};
      }
}