import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { request_midtrans, response_midtrans } from './midtrans.model';
import { logCallbackEntity } from 'src/database/iptv/log_failed_callback.entity';

@Injectable()
export class MidtransService {
    constructor(
        @InjectModel(iptv_feature)
        private _hotel: typeof iptv_feature,
        @InjectModel(logCallbackEntity)
        private _logCallbackEntity: typeof logCallbackEntity,
    ){}


    async createMidtransClient(hotelId: number) {
        // Dapatkan detail konfigurasi berdasarkan hotelId dari database
        const hotelData =await this._hotel.findOne({where:{id:hotelId,is_active:true}});
        if(hotelData==null){
            throw('Hotel tidak ditemukan!');
        }
        if(!hotelData.is_midtrans){
            throw('Hotel tidak terintegrasi midtrans!');
        }

        const midtransClient = require('midtrans-client');

        console.log(midtransClient);
        // Inisialisasi midtransClient dengan detail hotel tersebut
        const snap = new midtransClient.Midtrans.Snap({
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


    async verifySignature(callbackData: any, serverKey:string): Promise<boolean> {
        const { order_id, status_code, gross_amount, signature_key } = callbackData;
    
        // Buat signature yang seharusnya
        const expectedSignature = require('crypto')
          .createHash('sha512')
          .update(order_id + status_code + gross_amount + serverKey)
          .digest('hex');
    
        // Bandingkan dengan signature dari Midtrans
        return expectedSignature === signature_key;
    }


    async logCallback(callbackData: any,reason:string,order_id?:string):Promise<any>{
        return await this._logCallbackEntity.create(
            {
                callback_data:callbackData,
                reason:reason,
                order_id:order_id
            },
            {
                fields:[
                    'callback_data',
                    'reason',
                    'order_id'
                ]
            }
        );
    }
}
