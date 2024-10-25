import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { iptv_feature } from 'src/database/iptv/iptv_feature.entity';
import { orderRestoEntity } from 'src/database/iptv/order_resto.entity';
import { orderRestoDetailEntity } from 'src/database/iptv/order_resto_detail.entity';
import { users_deviceEntity } from 'src/database/iptv/users_device.entity';
import { canceledOrder, insertOrderResto, paramGetOrderResto } from './order_resto.dto';
import { generateNumber } from 'src/utility/nomor_counter.helper';
import { fn } from 'sequelize';

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
        private _generateNumber:generateNumber
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
    
    findAll(param:paramGetOrderResto,req:any): Promise<any> {
        try {
            let filters =` order_date between '${param.start_date}' AND '${param.end_date}' AND "orderRestoEntity".id_hotel=${req.user.id_hotel}`;
            return this._orderRestoEntity.findAll({
                attributes:this.attr,
                include:this.incl,
                where:this.sequelize.literal(filters),
                order:[
                    ['id_order_resto','desc']
                ]
            });            
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
                await transaction.rollback();
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
                    await transaction.rollback();
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
    
    
    
    async batal(param:canceledOrder,req:any): Promise<void> {
        await this._orderRestoEntity.update(
            {
                status_order:5,
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
}
            