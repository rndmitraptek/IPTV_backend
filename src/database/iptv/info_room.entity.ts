import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'info_room' })
export class info_room extends Model<info_room> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_info_room : number;

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
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    diskon : number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    diskon_nominal : number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    harga_total : number;
    
}