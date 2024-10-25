import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { format, formatInTimeZone } from 'date-fns-tz';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { nomor_counter } from 'src/database/iptv/nomor_counter.entity';

@Injectable()
export class generateNumber {
    constructor(
        @InjectModel(nomor_counter)
        private _nomor_counter: typeof nomor_counter,
        private readonly sequelize: Sequelize,
    ) { }

    async getNumbering(deskripsi: string, transaction: Transaction, hotelId?:number): Promise<[string, number]> {
        let getbyDesc = await this._nomor_counter.findOne({
            where: {
                deskripsi: deskripsi
            },
            transaction: transaction,
            lock: true,
        })

        let gettahun = getbyDesc.tahun;
        let pad = "00";
        let getbulan = pad.substring(0, pad.length - getbyDesc.bulan.length) + getbyDesc.bulan;
        let getkode = getbyDesc.kode_counter;
        const today = new Date();
        const timeZone = 'Asia/Bangkok';
        const d = today;
        // const d2 = formatInTimeZone(today, timeZone, 'yyyy-MM-dd HH:mm:ss zzz');
        let now_tahun = formatInTimeZone(d, timeZone, 'yyyy');
        let now_tahun_yy = formatInTimeZone(d, timeZone, 'yy');
        let now_bulan = formatInTimeZone(d, timeZone, 'MM');
        // let now_tgl = formatInTimeZone(d, timeZone, 'dd');
        let now_tgl = '';
        let sethotelId =hotelId ?`-${hotelId}`:'';
        if (gettahun == now_tahun && getbulan == now_bulan) {
            let count = getbyDesc.no_counter + 1;
            let counter = "" + count;
            let pad = "000000";
            let ans = pad.substring(0, pad.length - counter.length) + counter;
            let number = '';

            number = getkode + sethotelId+ '-' + now_tahun_yy + now_bulan + '-' + ans;

            console.log(number);
            return [number, count];
        } else {
            let counter = "" + 1;
            let pad = "000000";
            let ans = pad.substring(0, pad.length - counter.length) + counter
            let number = '';

            number = getkode + sethotelId+ '-'  + '-' + now_tahun_yy + now_bulan + '-' + ans;

            console.log(number);
            return [number, 1];
        }
    }

    async getNumberingv1(deskripsi: string, transaction: Transaction): Promise<[string, number]> {
        let getbyDesc = await this._nomor_counter.findOne({
            where: {
                deskripsi: deskripsi
            },
            transaction: transaction,
            lock: true,
        })

        let getkode = getbyDesc.kode_counter;
        let count = getbyDesc.no_counter + 1;
        let counter = "" + count;
        let pad = "0000";
        let ans = pad.substring(0, pad.length - counter.length) + counter;
        let number = '';
        number = getkode+ans;
        return [number, count];
    }

    async updateCounter(deskripsi: string, counter: number, transaction: Transaction): Promise<any> {
        const today = new Date();
        const timeZone = 'Asia/Bangkok';
        const d = today;
        let now_tahun = format(d, 'yyyy');
        let now_bulan = format(d, 'MM');
        return await this._nomor_counter.update(
            {
                no_counter: counter,
                tahun: now_tahun,
                bulan: now_bulan
            },
            {
                where: {
                    deskripsi: deskripsi
                },
                transaction: transaction
            }
        );
    }
}