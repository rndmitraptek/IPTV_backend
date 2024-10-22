import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createUserDeviceRoom{
    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username:string;
    @IsNotEmpty({
        message:"password tidak boleh kosong"
    })
    password:string;
    @IsNotEmpty({
        message:"room ID tidak boleh kosong"
    })
    room_id:string;
    @IsNotEmpty({
        message:"id hotel tidak boleh kosong"
    })
    id_hotel:number;
}

export class updateUserDeviceRoom{
    @IsNotEmpty({
        message:"id tidak boleh kosong"
    })
    id_user_device:number;
    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username:string;
    @ApiPropertyOptional()
    password:string;
    @IsNotEmpty({
        message:"room ID tidak boleh kosong"
    })
    room_id:string;
}