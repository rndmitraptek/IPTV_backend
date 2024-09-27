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
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    uuid : string;

    @Column({
        type: DataType.BIGINT,
    })
    id_akun : bigint

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nama: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

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
    id_layanan: bigint;


    @Column({
        type: DataType.STRING,
    })
    pass: string;

}