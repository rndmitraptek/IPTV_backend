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

}