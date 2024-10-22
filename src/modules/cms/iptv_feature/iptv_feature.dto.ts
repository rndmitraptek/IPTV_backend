import { IsNotEmpty } from 'class-validator';

export class iptv_featureDtoInsert{

    @IsNotEmpty({
        message:'video_splash_name tidak boleh kosong'
    })
    video_splash_name : string

    @IsNotEmpty({
        message:'video_splash_url tidak boleh kosong'
    })
    video_splash_url : string

    @IsNotEmpty({
        message:'title_hotel_name tidak boleh kosong'
    })
    title_hotel : string

    @IsNotEmpty({
        message:'logo_hotel_name tidak boleh kosong'
    })
    logo_hotel_name : string

    @IsNotEmpty({
        message:'logo_hotel_url tidak boleh kosong'
    })
    logo_hotel_url : string

    @IsNotEmpty({
        message:'background_image_name tidak boleh kosong'
    })
    background_image_name : string

    @IsNotEmpty({
        message:'background_image_url tidak boleh kosong'
    })
    background_image_url : string

    @IsNotEmpty({
        message:'video_channel_0_name tidak boleh kosong'
    })
    video_channel_0_name : string

    @IsNotEmpty({
        message:'video_channel_0_url tidak boleh kosong'
    })
    video_channel_0_url : string

    @IsNotEmpty({
        message:'default_home tidak boleh kosong'
    })
    default_home : string

    @IsNotEmpty({
        message:'address tidak boleh kosong'
    })
    address : string

    @IsNotEmpty({
        message:'expired_date tidak boleh kosong'
    })
    expired_date : Date
    
    @IsNotEmpty({
        message:'actived_at tidak boleh kosong'
    })
    actived_at : Date

}