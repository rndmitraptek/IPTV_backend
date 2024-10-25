import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import midtransClient from 'midtrans-client';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { request_midtrans, response_midtrans } from './midtrans.model';

@Injectable()
export class MidtransService {
    constructor(
        @InjectModel(iptv_feature)
        private _hotel: typeof iptv_feature,
    ){}


    async createMidtransClient(hotelId: string) {
        // Dapatkan detail konfigurasi berdasarkan hotelId dari database
        const hotelData =await this._hotel.findOne({where:{id:hotelId,is_active:true}});
        if(hotelData==null){
            throw('Hotel tidak ditemukan!');
        }
        if(hotelData.is_midtrans){
            throw('Hotel tidak terintegrasi midtrans!');
        }

        // Inisialisasi midtransClient dengan detail hotel tersebut
        const snap = new midtransClient.Snap({
        isProduction: hotelData.is_midtrans_production,
        serverKey: hotelData.midtrans_server_key,
        clientKey: hotelData.midtrans_client_key,
        });

        return snap;
    }


    async createTransactionMidtrans(param:request_midtrans):Promise<response_midtrans>{
        try {
            const snap = await this.createMidtransClient(param.hotelId);

            const transaction = await snap.createTransaction(param);
            transaction.status_code = 200;
            return transaction;
        } catch (error) {
            if(error.name=='MidtransError'){
                return {
                    status_code:error.httpStatusCode,
                    error_messages:error.ApiResponse.error_messages
                }
            }
            throw error
        }
    }

}
