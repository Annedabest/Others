import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptStatusDto } from './dto/update-receipt-status.dto';
import { Receipt, ReceiptStatus } from '@prisma/client';

export interface ReceiptListItem {
  id: string;
  organizationId: string;
  vendor?: string | null;
  amount: number;
  currency: string;
  status: ReceiptStatus;
  source: string;
  documentUrl?: string | null;
  receivedAt: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    displayName: string;
    email: string;
  } | null;
}

@Injectable()
export class ReceiptsService {
  constructor(private readonly prisma: PrismaService) {}

  async findRecent(organizationId: string, take = 20): Promise<ReceiptListItem[]> {
    const receipts = await this.prisma.receipt.findMany({
      where: { organizationId },
      orderBy: { receivedAt: 'desc' },
      take,
      include: { user: true }
    });

    return receipts.map((receipt) => this.mapReceipt(receipt));
  }

  async create(dto: CreateReceiptDto): Promise<ReceiptListItem> {
    const receipt = await this.prisma.receipt.create({
      data: {
        organizationId: dto.organizationId,
        userId: dto.userId,
        vendor: dto.vendor,
        amount: dto.amount,
        currency: dto.currency,
        source: dto.source ?? 'manual',
        documentUrl: dto.documentUrl,
        receivedAt: new Date(dto.receivedAt),
        status: dto.status ?? ReceiptStatus.PENDING
      }
    });

    return this.mapReceipt(receipt);
  }

  async updateStatus(id: string, dto: UpdateReceiptStatusDto): Promise<ReceiptListItem> {
    const receipt = await this.prisma.receipt.findUnique({ where: { id } });
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    const updated = await this.prisma.receipt.update({
      where: { id },
      data: { status: dto.status }
    });

    return this.mapReceipt(updated);
  }

  private mapReceipt(receipt: Receipt & { user?: { id: string; displayName: string; email: string } | null }): ReceiptListItem {
    return {
      id: receipt.id,
      organizationId: receipt.organizationId,
      vendor: receipt.vendor,
      amount: Number(receipt.amount),
      currency: receipt.currency,
      status: receipt.status,
      source: receipt.source,
      documentUrl: receipt.documentUrl,
      receivedAt: receipt.receivedAt.toISOString(),
      createdAt: receipt.createdAt.toISOString(),
      updatedAt: receipt.updatedAt.toISOString(),
      user: receipt.user
        ? {
            id: receipt.user.id,
            displayName: receipt.user.displayName,
            email: receipt.user.email
          }
        : null
    };
  }
}
