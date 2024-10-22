import { IsNotEmpty } from "class-validator";

export class usersCmsDtoInsert{
    @IsNotEmpty({
        message:"nama tidak boleh kosong"
    })
    nama: string;

    @IsNotEmpty({
        message:"role tidak boleh kosong"
    })
    id_role: number;

    @IsNotEmpty({
        message:"id hotel tidak boleh kosong"
    })
    id_hotel: number;

    @IsNotEmpty({
        message:"username tidak boleh kosong"
    })
    username: string;

    @IsNotEmpty({
        message:"password tidak boleh kosong"
    })
    password:string;

}


export class usersCmsDtoUpdate{
    @IsNotEmpty({
        message:"nama tidak boleh kosong"
    })
    nama: string;

    @IsNotEmpty({
        message:"role tidak boleh kosong"
    })
    id_role: number;
    
    @IsNotEmpty({
        message:"hotel tidak boleh kosong"
    })
    id_hotel: number;

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