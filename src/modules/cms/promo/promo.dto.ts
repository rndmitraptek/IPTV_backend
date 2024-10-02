import { IsNotEmpty } from 'class-validator';

export class promoDtoInsert{

    urut : number

    @IsNotEmpty({
        message:'image_promo_url tidak boleh kosong'
    })
    image_promo_url : string

    @IsNotEmpty({
        message:'image_promo_name tidak boleh kosong'
    })
    image_promo_name : string

    @IsNotEmpty({
        message:'title_promo tidak boleh kosong'
    })
    title_promo : string

    @IsNotEmpty({
        message:'description tidak boleh kosong'
    })
    description : string

    @IsNotEmpty({
        message:'start_date tidak boleh kosong'
    })
    start_date : string

    @IsNotEmpty({
        message:'end_date tidak boleh kosong'
    })
    end_date : string

}