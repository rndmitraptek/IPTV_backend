import { IsNotEmpty } from 'class-validator';

export class greeting_cardDtoInsert{

    @IsNotEmpty({
        message:'video_name tidak boleh kosong'
    })
    video_name : string

    @IsNotEmpty({
        message:'video_url tidak boleh kosong'
    })
    video_url : string

    @IsNotEmpty({
        message:'no_room tidak boleh kosong'
    })
    no_room : string

    @IsNotEmpty({
        message:'start_date tidak boleh kosong'
    })
    start_date : string

    @IsNotEmpty({
        message:'end_date tidak boleh kosong'
    })
    end_date : string

    @IsNotEmpty({
        message:'detail room tidak boleh kosong'
    })
    detail_room : detailRoom[]
    

}

export class detailRoom{
    @IsNotEmpty({
        message:'user room tidak boleh kosong'
    })
    id_user_device : number
}