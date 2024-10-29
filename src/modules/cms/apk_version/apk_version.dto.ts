import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class apk_versionDtoInsert{

    @IsNotEmpty({
        message:'version tidak boleh kosong'
    })
    version : string

    @IsNotEmpty({
        message:'description tidak boleh kosong'
    })
    description : string
    
    @ApiProperty({ type: 'string', format: 'binary', required: true, nullable: false })
    file : string

    is_active : boolean;
    @IsNotEmpty()
    type:string;
    @IsNotEmpty()
    secretkey:string;
}

export const secretKeyVersion='f79bec62-3846-4616-b91f-6983f42ca912';