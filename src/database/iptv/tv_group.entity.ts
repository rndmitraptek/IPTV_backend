import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'tv_group' })
export class tv_group extends Model<tv_group> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_group : number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    group : string;
    
}