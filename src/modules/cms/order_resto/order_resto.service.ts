import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { orderRestoEntity } from 'src/database/iptv/order_resto.entity';
import { orderRestoDetailEntity } from 'src/database/iptv/order_resto_detail.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { canceledOrder, insertOrderResto, jenisPembayaran, paramGetOrderResto, pembayaranOrder, updateStatusOrder } from './order_resto.dto';
import { generateNumber } from 'src/utility/nomor_counter.helper';
import { fn } from 'sequelize';
import { MidtransService } from 'src/utility/midtrans.dynamic.helper';
import { request_midtrans } from 'src/utility/midtrans.model';
import { AppGateway } from 'src/utility/websocket.helper';

@Injectable({ scope: Scope.REQUEST })
export class OrderRestoService {
    attr 
    incl
    constructor(
        private sequelize:Sequelize,
        @InjectModel(orderRestoEntity)
        private _orderRestoEntity: typeof orderRestoEntity,
        @InjectModel(orderRestoDetailEntity)
        private _orderRestoDetailEntity: typeof orderRestoDetailEntity,
        @InjectModel(iptv_feature)
        private _iptv_feature: typeof iptv_feature,
        private _generateNumber:generateNumber,
        private _MidtransService:MidtransService,
        private _AppGateway:AppGateway,
    ) {
        this.attr=[
            'id_order_resto',
            'order_date',
            'order_number',
            'id_hotel',
            [this.sequelize.col('hotel.title_hotel'),'nama_hotel'],
            'guest_name',
            'id_user_device',
            [this.sequelize.col('user_device.room_id'),'room_id'],
            'diskon_persen',
            'diskon_nominal',
            'ppn_persen',
            'ppn_nominal',
            'grand_total',
            'created_at',
            'updated_at',
            'created_by',
            'updated_by',
            'status_bayar',
            'status_order',
            'canceled_at',
            'canceled_by',
            'reason_canceled',
        ];

        this.incl=[
            {
                attributes:[],
                model:iptv_feature,
                as:'hotel'
            },
            {
                attributes:[],
                model:users_deviceEntity,
                as:'user_device'
            }
        ];
    }
    
    async findAll(param:paramGetOrderResto,req:any): Promise<any> {
        try {
            let filters =` order_date between '${param.start_date}' AND '${param.end_date}' AND "orderRestoEntity".id_hotel=${req.user.id_hotel}`;
            let orders= await this._orderRestoEntity.findAll({
                attributes:this.attr,
                include:this.incl,
                where:this.sequelize.literal(filters),
                order:[
                    ['id_order_resto','desc']
                ]
            });    
            return orders.map(order => ({
                ...order.get(),
                status_order_name: order.status_order_name,
                status_bayar_name: order.status_bayar_name,
            }));       
        } catch (error) {
            throw error;
        }
    }


    async getByRoom(param:paramGetOrderResto,req:any): Promise<any> {
        try {
            let filters =` order_date between '${param.start_date}' AND '${param.end_date}' AND "orderRestoEntity".id_user_device=${req.user.id_user}`;
            let orders= await this._orderRestoEntity.findAll({
                attributes:this.attr,
                include:this.incl,
                where:this.sequelize.literal(filters),
                order:[
                    ['id_order_resto','desc']
                ]
            });    
            return orders.map(order => ({
                ...order.get(),
                status_order_name: order.status_order_name,
                status_bayar_name: order.status_bayar_name,
            }));       
        } catch (error) {
            throw error;
        }
    }

    
    findOne(id: number): Promise<any> {
        return this._orderRestoEntity.findOne({
            attributes:this.attr,
            include:[
                {
                    attributes:[],
                    model:iptv_feature,
                    as:'hotel'
                },
                {
                    attributes:[],
                    model:users_deviceEntity,
                    as:'user_device'
                },
                {
                    attributes:[
                        'id_order_resto_detail',
                        'id_order_resto',
                        'id_resto',
                        'title',
                        'harga',
                        'qty',
                        'subtotal',
                    ],
                    model:orderRestoDetailEntity,
                    as:'detail'
                }
            ],
            where:{id_order_resto:id},
            order:[
                [this.sequelize.col('detail.id_order_resto_detail'),'desc']
            ]
        });    
    }
    
    async create(param: insertOrderResto, req:any): Promise<any> {
        let transaction = await this.sequelize.transaction();
        try {
            if(req.user.id_hotel ==undefined){
                throw ('Akun anda tidak memiliki hotel');
            }
            if(req.user.room_id ==undefined){
                throw ('Akun anda tidak memiliki room id');
            }
            let _orderRestoEntity={};
            _orderRestoEntity['order_date']=param.order_date;
            _orderRestoEntity['guest_name']=param.guest_name;
            _orderRestoEntity['grand_total']=param.grand_total;
            _orderRestoEntity['created_by']=req.user.username;
            _orderRestoEntity['updated_by']=req.user.username;
            _orderRestoEntity['id_hotel']=req.user.id_hotel;
            _orderRestoEntity['id_user_device']=req.user.id_user;
            _orderRestoEntity['status_bayar']=0;
            _orderRestoEntity['status_order']=0;
    
            let number = await this._generateNumber.getNumbering('order_resto', transaction, req.user.id_hotel);
            if (number) {
                let update = await this._generateNumber.updateCounter('order_resto', number[1], transaction);
                if (!update) {
                    throw ('Insert failed, get numbering failed');
                }
            }
            const no_trans = number[0];

            _orderRestoEntity['order_number']=no_trans;
    
            let insertHeader= await this._orderRestoEntity.create(_orderRestoEntity,{transaction:transaction});
            if(!insertHeader){
                throw('create order failed');
            }

            for(let i=0; i<param.detail.length; i++){
                let insertDetail =await this._orderRestoDetailEntity.create(
                    {
                        id_order_resto:insertHeader.id_order_resto,
                        id_resto:param.detail[i].id_resto,
                        title:param.detail[i].title,
                        harga:param.detail[i].harga,
                        qty:param.detail[i].qty,
                        subtotal:param.detail[i].subtotal,

                    }, 
                    {
                        fields:[
                            'id_order_resto',
                            'id_resto',
                            'title',
                            'harga',
                            'qty',
                            'subtotal'
                        ],
                        transaction:transaction
                    });
                if(!insertDetail){
                    throw('create order failed on detail');
                }
            }

            await transaction.commit();
            return 'success';
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async tesWS(param:insertOrderResto,req:any):Promise<any>{
        const payload={
            id_hotel:req.user.id_hotel,
            message:param
        }
        let send =await this._AppGateway.handleMessage(payload);
        return 'success';
    }


    async jenisPembayaranByHotel(req:any):Promise<any>{
        if(req.user.id_hotel ==undefined){
            throw('Akun anda tidak memiliki hotel');
        }

        let getHotel =await this._iptv_feature.findOne({where:{id:req.user.id_hotel}});
        if(getHotel==null){
            throw('Data tidak ditemukan');
        }
        if(getHotel.is_midtrans){
            return [
                {
                    jenis:jenisPembayaran.BAYAR_DIKAMAR
                },
                {
                    jenis:jenisPembayaran.ONLINE
                }
            ];
        } else {
            return [
                {
                    jenis:jenisPembayaran.BAYAR_DIKAMAR
                }
            ];
        }
    }


    async pembayaran(param:pembayaranOrder,req:any):Promise<any>{
        let transaction = await this.sequelize.transaction();
        try {
            let getData =await this._orderRestoEntity.findOne({where:{id_order_resto:param.id_order_resto}});
            if(getData==null){
                throw ('Data tidak ditemukan');
            }

            let updatePembayaran =await this._orderRestoEntity.update(
                {
                    jenis_pembayaran:param.jenis_pembayaran,
                    updated_by:req.user.username
                },
                {
                    where:{
                        id_order_resto:param.id_order_resto
                    },
                    transaction:transaction
                }
            );
            if(!updatePembayaran){
                throw ('Pembayaran gagal');
            }

            if(param.jenis_pembayaran==jenisPembayaran.ONLINE){
                let paramMidtrans:request_midtrans ={
                    hotelId :getData.id_hotel,
                    transaction_details :{
                        order_id:getData.order_number,
                        gross_amount:getData.grand_total
                    },
                    // enabled_payments :['qris']
                };
                console.log(paramMidtrans);

                let createTrxMid =await this._MidtransService.createTransactionMidtrans(paramMidtrans);

                await transaction.commit();
                return createTrxMid;
            } else {
                await transaction.commit();
                return 'success';
            }

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    

    async verifyCallback(callbackData:any):Promise<any>{
        try {
            console.log('callbackData');
            console.log(callbackData);
            const { order_id, transaction_status } = callbackData;
            let getData =await this._orderRestoEntity.findOne({where:{order_number:order_id}});
            if(getData==null){
                await this._MidtransService.logCallback(callbackData,'Data tidak ditemukan',order_id);
                // return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid signature' });
                throw('Data tidak ditemukan');
            }

            let getHotel =await this._iptv_feature.findOne({where:{id:getData.id_hotel}});
            if(getHotel==null){
                await this._MidtransService.logCallback(callbackData,'Hotel tidak ditemukan',order_id);
                throw('Hotel tidak ditemukan');
            }
            if(getHotel.midtrans_server_key==null){
                await this._MidtransService.logCallback(callbackData,'Serverkey tidak ditemukan',order_id);
                throw('Serverkey tidak ditemukan');
            }

            let isValid =await this._MidtransService.verifySignature(callbackData,getHotel.midtrans_server_key);
            if (!isValid) {
                await this._MidtransService.logCallback(callbackData,'Signature tidak valid',order_id);
                throw('Signature tidak valid');
            }

            let status_bayar=0;
            if(transaction_status=='settlement'){
                status_bayar=1;
            }
            if(transaction_status=='pending'){
                status_bayar=2;
            }
            if(transaction_status=='cancel'){
                status_bayar=3;
            }

            let updateStatus =await this._orderRestoEntity.update(
                {
                    status_bayar:status_bayar
                },
                {
                    where:{id_order_resto:getData.id_order_resto}
                }
            );
            if(!updateStatus){
                await this._MidtransService.logCallback(callbackData,'Update status bayar gagal',order_id);
                throw('Update status bayar gagal');
            }

            await this._MidtransService.logCallback(callbackData,'Success',order_id);

            return 'Callback received';
        } catch (error) {
            throw error;
        }
    }
    
    
    async batal(param:canceledOrder,req:any): Promise<void> {
        await this._orderRestoEntity.update(
            {
                status_order:4,
                reason_canceled:param.reason_canceled,
                canceled_at:fn('NOW'),
                canceled_by:req.user.username
            }, 
            {
                where: {
                    id_order_resto:param.id_order_resto,
                },
            }
        );
    }


    async updateStatusOrder(param:updateStatusOrder,req:any): Promise<void> {
        await this._orderRestoEntity.update(
            {
                status_order:param.status_order,
                updated_by:req.user.username
            }, 
            {
                where: {
                    id_order_resto:param.id_order_resto,
                },
            }
        );
    }
}
            