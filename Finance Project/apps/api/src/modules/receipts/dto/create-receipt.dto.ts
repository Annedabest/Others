import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReceiptStatus } from '@prisma/client';

export class CreateReceiptDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  amount!: number;

  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsDateString()
  receivedAt!: string;

  @IsOptional()
  @IsEnum(ReceiptStatus)
  status?: ReceiptStatus;
}
