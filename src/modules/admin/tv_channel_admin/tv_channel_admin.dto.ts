import { IsNotEmpty } from 'class-validator';

export class tv_channelAdminDtoInsert {
  @IsNotEmpty({
    message: 'id_group tidak boleh kosong',
  })
  id_group: number;

  urut: number;

  @IsNotEmpty({
    message: 'title_channel tidak boleh kosong',
  })
  title_channel: string;

  @IsNotEmpty({
    message: 'url channel tidak boleh kosong',
  })
  url: string;

  @IsNotEmpty({
    message: 'icon_url tidak boleh kosong',
  })
  icon_url: string;

  @IsNotEmpty({
    message: 'icon_name tidak boleh kosong',
  })
  icon_name: string;

  @IsNotEmpty({
    message: 'id_hotel tidak boleh kosong',
  })
  id_hotel: number;

  // @IsNotEmpty({
  //     message:'is_active tidak boleh kosong'
  // })
  // is_active : boolean

  // @IsNotEmpty({
  //     message:'is_assign tidak boleh kosong'
  // })
  // is_assign : boolean
}

export class tv_channelAdminDtoUpdateUrut {
  @IsNotEmpty({
    message: 'id_channel tidak boleh kosong',
  })
  id_channel: number;

  @IsNotEmpty({
    message: 'urut tidak boleh kosong',
  })
  urut: number;
}

export class tv_channelAdminDtoUpdateUrutRequest {
  @IsNotEmpty({
    message: 'data tidak boleh kosong',
  })
  data: tv_channelAdminDtoUpdateUrut[];
}
