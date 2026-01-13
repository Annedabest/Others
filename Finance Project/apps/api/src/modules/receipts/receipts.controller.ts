import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptStatusDto } from './dto/update-receipt-status.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Get()
  findRecent(@Query('organizationId') organizationId: string, @Query('take') take?: string) {
    const orgId = organizationId ?? 'org-church-001';
    const limit = take ? Math.min(Number(take), 100) : 20;
    return this.receiptsService.findRecent(orgId, limit);
  }

  @Post()
  create(@Body() dto: CreateReceiptDto) {
    return this.receiptsService.create(dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateReceiptStatusDto) {
    return this.receiptsService.updateStatus(id, dto);
  }
}
