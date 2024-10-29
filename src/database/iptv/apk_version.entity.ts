import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'apk_version' })
export class apk_version extends Model<apk_version> {

    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_apk_version : number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    version : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    file : string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_active : boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type : string;
}