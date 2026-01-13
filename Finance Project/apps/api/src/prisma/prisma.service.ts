import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('database.url') ?? process.env.DATABASE_URL
        }
      }
    });
    const url = configService.get<string>('database.url') ?? process.env.DATABASE_URL ?? '(undefined)';
    const redacted = url.replace(/:(.*)@/, ':****@');
    console.log(`[Prisma] Using DATABASE_URL=${redacted}`);
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
