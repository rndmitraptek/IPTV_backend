import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class hotelDtoInsert {
  @IsNotEmpty({
    message: 'title_hotel_name tidak boleh kosong',
  })
  title_hotel: string;

  @IsNotEmpty({
    message: 'address tidak boleh kosong',
  })
  address: string;

  @IsNotEmpty({
    message: 'expired_date tidak boleh kosong',
  })
  expired_date: Date;

  @IsNotEmpty({
    message: 'actived_at tidak boleh kosong',
  })
  actived_at: Date;

  pin: string;
}

export class updateIsStreamHotel {
  @ApiProperty()
  @IsNotEmpty()
  is_stream: boolean;
}
