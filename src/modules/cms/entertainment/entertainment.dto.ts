import { IsNotEmpty } from 'class-validator';

export class entertainmentDtoInsert{

    @IsNotEmpty({
        message:'title_app tidak boleh kosong'
    })
    title_app : string

    @IsNotEmpty({
        message:'icon_app tidak boleh kosong'
    })
    icon_app : string

    @IsNotEmpty({
        message:'package_name_app tidak boleh kosong'
    })
    package_name_app : string
    @IsNotEmpty({
        message:'group_name tidak boleh kosong'
    })
    group_name : string
    @IsNotEmpty({
        message:'jenis_device tidak boleh kosong'
    })
    jenis_device : string

}