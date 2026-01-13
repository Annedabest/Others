import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { User } from '@prisma/client';

export interface AuthPayload {
  accessToken: string;
  user: {
    id: string;
    email: string;
    displayName: string;
    language: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  getStatus() {
    return { service: 'auth', status: 'ready' } as const;
  }

  async register(dto: RegisterDto): Promise<AuthPayload> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        displayName: dto.displayName,
        language: 'en'
      }
    });

    return this.buildAuthPayload(user);
  }

  async login(dto: LoginDto): Promise<AuthPayload> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return this.buildAuthPayload(user);
  }

  private async buildAuthPayload(user: Pick<User, 'id' | 'email' | 'displayName' | 'language'>): Promise<AuthPayload> {
    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email, displayName: user.displayName },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h'
      }
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        language: user.language
      }
    };
  }
}
