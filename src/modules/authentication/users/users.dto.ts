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