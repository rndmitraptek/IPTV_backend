import { IsNotEmpty } from 'class-validator';

export class role_menuDtoInsert{

    @IsNotEmpty({
        message:'id_role tidak boleh kosong'
    })
    id_role : number

    @IsNotEmpty({
        message:'id_menu tidak boleh kosong'
    })
    id_menu : number

}