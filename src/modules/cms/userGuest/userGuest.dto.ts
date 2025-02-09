import { IsNotEmpty } from 'class-validator';

export class userGuestInsert {
  @IsNotEmpty()
  id_user_device: number;
  @IsNotEmpty()
  nama_tamu: string;
  @IsNotEmpty()
  start_date: Date;
  @IsNotEmpty()
  end_date: Date;
}

export class userGuestMulti {
  @IsNotEmpty()
  detail: userGuestInsert[];
}
