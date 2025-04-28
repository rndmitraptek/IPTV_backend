import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class insertOrderResto {
  // @IsNotEmpty()
  // order_date:Date;
  guest_name: string;
  @IsNotEmpty()
  grand_total: number;
  @IsNotEmpty()
  detail: detailOrderResto[];
}

export class detailOrderResto {
  @IsNotEmpty()
  id_resto: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  harga: number;
  @IsNotEmpty()
  qty: number;
  @IsNotEmpty()
  subtotal: number;
}

export enum jenisPembayaran {
  BAYAR_DIKAMAR = 'BAYAR DIKAMAR',
  ONLINE = 'ONLINE',
}

export class pembayaranOrder {
  @IsNotEmpty()
  id_order_resto: number;
  @IsNotEmpty()
  @IsEnum(jenisPembayaran)
  jenis_pembayaran: string;
  id_payment_method: number;
}

export class paramGetOrderResto {
  @IsNotEmpty()
  start_date: string;
  @IsNotEmpty()
  end_date: string;
}

export class canceledOrder {
  @IsNotEmpty()
  id_order_resto: number;
  @IsNotEmpty()
  reason_canceled: string;
}

export enum statusOrder {
  DIPROSES = 1,
  DIANTAR = 2,
  DITERIMA = 3,
}

export class updateStatusOrder {
  @IsNotEmpty()
  id_order_resto: number;
  @IsNotEmpty()
  @IsEnum(statusOrder)
  status_order: number;
}

export class updateStatusBayar {
  @IsNotEmpty()
  id_order_resto: number;
  @IsNotEmpty()
  id_payment_method: number;
  @IsNotEmpty()
  nominal_bayar: number;
  file_bukti_bayar_nama: string;
  file_bukti_bayar_url: string;
}

export const masterStatusOrder = [
  { status_code: 0, status_name: 'ORDER' },
  { status_code: 1, status_name: 'DIPROSES' },
  { status_code: 2, status_name: 'DIANTAR' },
  { status_code: 3, status_name: 'DITERIMA' },
  { status_code: 4, status_name: 'DIBATAL' },
];

export const masterStatusBayar = [
  { status_code: 0, status_name: 'BELUM BAYAR' },
  { status_code: 1, status_name: 'LUNAS' },
  { status_code: 2, status_name: 'PENDING' },
  { status_code: 3, status_name: 'CANCEL' },
];
