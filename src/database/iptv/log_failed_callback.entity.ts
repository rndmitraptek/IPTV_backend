import { ApiHideProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'log_callback', timestamps:true,updatedAt:false,createdAt:'created_at' })
export class logCallbackEntity extends Model<logCallbackEntity> { 
    
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
    transaction_status:string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    order_id:string;

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