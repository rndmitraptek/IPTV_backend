import { ApiHideProperty } from '@nestjs/swagger';
import { BeforeCreate, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'session_device',timestamps:true, updatedAt:false,createdAt:'created_at' })
export class sessionDeviceEntity extends Model<sessionDeviceEntity> {
    @ApiHideProperty()
    @Column({
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true,
    })
    id_session_device:string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id_user_device:number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    ip:string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    device_info:string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    last_refresh_at:Date;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    refresh_count:number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at:Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    created_by:string;


    
}