import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class insertBackground{
    @IsNotEmpty()
    background_name:string;
    @IsNotEmpty()
    background_url:string;
    @IsNotEmpty()
    start_date:Date;
    @IsNotEmpty()
    end_date:Date;
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