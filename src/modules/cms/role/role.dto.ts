import { IsNotEmpty } from 'class-validator';

export class roleDtoInsert{

    @IsNotEmpty({
        message:'role tidak boleh kosong'
    })
    role : string

}