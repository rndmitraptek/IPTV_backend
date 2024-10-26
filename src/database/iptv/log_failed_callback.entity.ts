import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'log_failed_callback', timestamps:true,updatedAt:false,createdAt:'created_at' })
export class logFailedCallbackEntity extends Model<logFailedCallbackEntity> { 
    
    @ApiHideProperty()
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    })
    id:number;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    callback_data:string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    reason:string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at : Date;
    
}