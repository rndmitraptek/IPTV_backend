import { IsNotEmpty } from 'class-validator';

export class insertPaymentMethodModel {
  @IsNotEmpty()
  payment_method_name: string;
}

export class updatePaymentMethodModel {
  @IsNotEmpty()
  payment_method_name: string;
  // @IsNotEmpty()
  is_active: boolean;
}
