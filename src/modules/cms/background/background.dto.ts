import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class insertBackground{
    @IsNotEmpty()
    background_url:string;
    @IsNotEmpty()
    start_date:Date;
    @IsNotEmpty()
    end_date:Date;
    @IsNotEmpty()
    id_user_device:number;

}