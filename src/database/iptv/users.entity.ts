import { ApiHideProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class users extends Model<users> {
    @ApiHideProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id_user : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nama: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id_role: number;

    @Column({
        type: DataType.BOOLEAN,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_admin: boolean;

}