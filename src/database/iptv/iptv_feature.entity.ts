import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'hotel' })
export class iptv_feature extends Model<iptv_feature> { 
    
    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id : number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video_splash_name : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video_splash_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title_hotel : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    logo_hotel_name : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    logo_hotel_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    background_image_name : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    background_image_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video_channel_0_name : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video_channel_0_url : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    default_home : string;
}