import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'nomor_counter' })
export class nomor_counter extends Model {
    @Column({
        autoIncrementIdentity: true,
        primaryKey: true,
    })
    id_counter: number;

    @Column
    kode_counter: string;

    @Column
    deskripsi: string;

    @Column
    no_counter: number;

    @Column
    tahun: string;

    @Column
    bulan: string;
}