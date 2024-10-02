import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'entertainment' })
export class entertainment extends Model<entertainment> { 

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_app : number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title_app : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    icon_app : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    package_name_app : string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue:true
    })
    is_active : boolean;
    
}