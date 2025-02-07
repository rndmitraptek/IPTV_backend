import { IsNotEmpty } from 'class-validator';

export class tv_groupAdminDtoInsert {
  @IsNotEmpty({
    message: 'group tidak boleh kosong',
  })
  group: string;
  @IsNotEmpty({
    message: 'id_hotel tidak boleh kosong',
  })
  id_hotel: number;
}

export class tv_groupAdminDtoUpdate {
  @IsNotEmpty({
    message: 'group tidak boleh kosong',
  })
  group: string;
  @IsNotEmpty({
    message: 'id_hotel tidak boleh kosong',
  })
  id_hotel: number;
}
