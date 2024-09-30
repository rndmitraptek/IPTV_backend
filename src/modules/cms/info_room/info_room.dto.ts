import { IsNotEmpty } from 'class-validator';

export class info_roomDtoInsert{

    @IsNotEmpty({
        message:'image_name tidak boleh kosong'
    })
    image_name : string

    @IsNotEmpty({
        message:'image_url tidak boleh kosong'
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

    @IsNotEmpty({
        message:'diskon tidak boleh kosong'
    })
    diskon : number

    @IsNotEmpty({
        message:'diskon_nominal tidak boleh kosong'
    })
    diskon_nominal : number

    @IsNotEmpty({
        message:'harga_total tidak boleh kosong'
    })
    harga_total : number

}