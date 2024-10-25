import { IsNotEmpty } from "class-validator";

export class insertOrderResto{
    @IsNotEmpty()
    order_date:Date;
    guest_name:string;
    @IsNotEmpty()
    grand_total:number;
    @IsNotEmpty()
    detail:detailOrderResto[]
}

export class detailOrderResto{
    @IsNotEmpty()
    id_resto:number;
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    harga:number;
    @IsNotEmpty()
    qty:number;
    @IsNotEmpty()
    subtotal:number;

}

export class paramGetOrderResto{
    @IsNotEmpty()
    start_date:string;
    @IsNotEmpty()
    end_date:string;
}

export class canceledOrder{
    @IsNotEmpty()
    id_order_resto:number;
    @IsNotEmpty()
    reason_canceled:string;
}