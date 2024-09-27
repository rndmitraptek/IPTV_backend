import * as dotenv from 'dotenv';
import * as midtransClient from 'midtrans-client';
import { request_midtrans, response_midtrans } from './midtrans.model';
dotenv.config();

export class MidtransHelper {
    private snap;
    private coreApi;
    constructor() {
        let config = {
            isProduction: (process.env.APP=='PRODUCTION')?true:false,
            serverKey: process.env.MIDTRANS_SERVER_KEY, // Ganti dengan Server Key dari Midtrans
            clientKey: process.env.MIDTRANS_CLIENT_KEY, // Ganti dengan Client Key dari Midtrans
        }

        this.snap = new midtransClient.Snap(config);
        this.coreApi = new midtransClient.CoreApi(config);
        
    }

    async createTransaction(param:request_midtrans):Promise<response_midtrans>{
        try {
            const transaction = await this.snap.createTransaction(param);
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

    async verifyNotification(notificationBody: any):Promise<any>{
        try {
            const notification = await this.coreApi.transaction.notification(notificationBody);
            notification.status_code = 200;
            return notification;
        } catch (error) {
            throw error
        }
    }
}