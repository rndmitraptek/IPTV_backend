import { IsNotEmpty } from "class-validator";

export class insertRestoGroup{
    @IsNotEmpty()
    nama_group:string
}