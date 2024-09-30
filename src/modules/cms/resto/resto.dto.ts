import { IsNotEmpty } from 'class-validator';

export class restoDtoInsert{

    @IsNotEmpty({
        message:'image name tidak boleh kosong'
    })
    image_name : string

    @IsNotEmpty({
        message:'image url tidak boleh kosong'
    })
    image_url : string

    @IsNotEmpty({
        message:'title tidak boleh kosong'
    })
    title : string

    @IsNotEmpty({
        message:'description tidak boleh kosong'
    })
    description : string

    @IsNotEmpty({
        message:'harga tidak boleh kosong'
    })
    harga : number

}