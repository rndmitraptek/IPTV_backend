import { IsNotEmpty } from "class-validator";

export class insertMenu{
    @IsNotEmpty()
    urut:number;
    @IsNotEmpty()
    caption:string;
    icon:string;
    toggle_child:string;
    url:string;
    @IsNotEmpty()
    is_parent:boolean;
    id_parent:number;
    @IsNotEmpty()
    is_admin:boolean;
    @IsNotEmpty()
    is_client:boolean;
}


export class updateMenu{
    @IsNotEmpty()
    is_active:boolean;
    @IsNotEmpty()
    urut:number;
    @IsNotEmpty()
    caption:string;
    icon:string;
    toggle_child:string;
    url:string;
    @IsNotEmpty()
    is_parent:boolean;
    id_parent:number;
    @IsNotEmpty()
    is_admin:boolean;
    @IsNotEmpty()
    is_client:boolean;
}