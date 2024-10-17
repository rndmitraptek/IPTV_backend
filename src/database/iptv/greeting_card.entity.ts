import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { iptv_feature } from './iptv_feature.entity';

@Table({ tableName: 'greeting_card' })
export class greeting_card extends Model<greeting_card> { 
    
    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_greeting_card : number;
    
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
}