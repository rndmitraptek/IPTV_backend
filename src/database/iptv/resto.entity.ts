import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'resto' })
export class resto extends Model<resto> { 

@ApiHideProperty()
@Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
})
id_resto : number;

@Column({
    type: DataType.STRING,
    allowNull: false,
})
image_name : string;

@Column({
    type: DataType.STRING,
    allowNull: false,
})
image_url : string;

@Column({
    type: DataType.STRING,
    allowNull: false,
})
title : string;

@Column({
    type: DataType.TEXT,
    allowNull: false,
})
description : string;

@Column({
    type: DataType.INTEGER,
    allowNull: false,
})
harga : number;

}