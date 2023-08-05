import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Administrator, Candidate } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: AuthSignInDto) {
    let user: Administrator | Candidate;
    if (dto.isAdmin)
      user = await this.prisma.administrator.findUnique({
        where: {
          email: dto.email,
        },
      });
    else
      user = await this.prisma.candidate.findUnique({
        where: {
          email: dto.email,
        },
      });
    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const passCorrect = await argon.verify(user.password, dto.password);
    if (!passCorrect) throw new ForbiddenException('Credentials Incorrect');

    return this.signToken(user.userId, user.email, dto.isAdmin);
  }
  async signup(dto: AuthSignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const data = {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        address: dto.address,
        gender: dto.gender,
        dateOfBirth: new Date(dto.dateOfBirth),
        password: hash,
        phone: dto.phone,
      };
      let user: Administrator | Candidate;
      if (dto.isAdmin) user = await this.prisma.administrator.create({ data });
      else user = await this.prisma.candidate.create({ data });
      return this.signToken(user.userId, user.email, dto.isAdmin);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
    isAdmin: boolean,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      isAdmin,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
