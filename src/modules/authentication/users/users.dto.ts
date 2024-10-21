import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class usersDtoInsert{
    @IsNotEmpty({
        message:"nama tidak boleh kosong"
    })
    nama: string;

    @IsNotEmpty({
        message:"role tidak boleh kosong"
    })
    id_role: number;

    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username: string;

    @IsNotEmpty({
        message:"password tidak boleh kosong"
    })
    password:string;

}

export class usersDtoUpdate{
    @IsNotEmpty({
        message:"nama tidak boleh kosong"
    })
    nama: string;

    @IsNotEmpty({
        message:"role tidak boleh kosong"
    })
    id_role: number;

    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username: string;

    password:string;

    @IsNotEmpty({
        message:"Status Active tidak boleh kosong"
    })
    is_active:boolean;

}

export class loginDto{
    
    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username: string;

    @IsNotEmpty({
        message:"password tidak boleh kosong"
    })
    password:string;

}

export class loginDeviceDto{
    
    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username: string;

    @IsNotEmpty({
        message:"password tidak boleh kosong"
    })
    password:string;

    @IsNotEmpty({
        message:"device_info tidak boleh kosong"
    })
    device_info:any;

}


export class createUserRoom{
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
}


export class updateUserRoom{
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