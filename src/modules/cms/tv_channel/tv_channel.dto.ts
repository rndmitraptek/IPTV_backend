import { IsNotEmpty } from 'class-validator';

export class tv_channelDtoInsert{

    @IsNotEmpty({
        message:'id_group tidak boleh kosong'
    })
    id_group : number

    @IsNotEmpty({
        message:'urut tidak boleh kosong'
    })
    urut : number

    @IsNotEmpty({
        message:'title_channel tidak boleh kosong'
    })
    title_channel : string

    @IsNotEmpty({
        message:'icon_url tidak boleh kosong'
    })
    icon_url : string

    @IsNotEmpty({
        message:'icon_name tidak boleh kosong'
    })
    icon_name : string

    // @IsNotEmpty({
    //     message:'is_active tidak boleh kosong'
    // })
    // is_active : boolean

    // @IsNotEmpty({
    //     message:'is_assign tidak boleh kosong'
    // })
    // is_assign : boolean

}