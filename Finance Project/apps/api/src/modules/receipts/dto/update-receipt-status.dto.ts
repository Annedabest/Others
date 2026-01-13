import { IsEnum } from 'class-validator';
import { ReceiptStatus } from '@prisma/client';

export class UpdateReceiptStatusDto {
  @IsEnum(ReceiptStatus)
  status!: ReceiptStatus;
}
