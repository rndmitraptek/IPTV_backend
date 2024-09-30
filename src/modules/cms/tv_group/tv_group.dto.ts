import { IsNotEmpty } from 'class-validator';

export class tv_groupDtoInsert{
    @IsNotEmpty({
        message:'group tidak boleh kosong'
    })
    group : string
}

export class tv_groupDtoUpdate{
    @IsNotEmpty({
        message:'group tidak boleh kosong'
    })
    group : string
}