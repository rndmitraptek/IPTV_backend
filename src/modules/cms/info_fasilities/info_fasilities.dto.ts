import { IsNotEmpty } from 'class-validator';

export class info_fasilitiesDtoInsert{

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
}