import { IsNotEmpty } from 'class-validator';

export class insertWarning {
  @IsNotEmpty()
  warning_text: string;
  is_active: boolean;
}

export class updateWarning {
  @IsNotEmpty()
  warning_text: string;
  @IsNotEmpty()
  is_active: boolean;
}
