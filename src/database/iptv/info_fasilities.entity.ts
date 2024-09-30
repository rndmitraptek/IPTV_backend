import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'info_fasilities' })
export class info_fasilities extends Model<info_fasilities> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_info_fasilites : number;

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
    
}