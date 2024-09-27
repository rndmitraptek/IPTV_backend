import { IsNotEmpty } from 'class-validator';

export class usersDtoInsert{
    @IsNotEmpty({
        message:"nama tidak boleh kosong"
    })
    nama: string;

    @IsNotEmpty({
        message:"email tidak boleh kosong"
    })
    email: string;

    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username: string;

    @IsNotEmpty({
        message:"password tidak boleh kosong"
    })
    password:string;

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