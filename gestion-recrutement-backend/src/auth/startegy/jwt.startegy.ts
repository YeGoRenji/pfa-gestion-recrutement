import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Administrator, Candidate } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

export type UserObj = (Candidate | Administrator) & {
  isAdmin: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; isAdmin: boolean }): Promise<UserObj> {
    let user: Candidate | Administrator;
    if (payload.isAdmin)
      user = await this.prisma.administrator.findUnique({
        where: {
          userId: payload.sub,
        },
      });
    else
      user = await this.prisma.candidate.findUnique({
        where: {
          userId: payload.sub,
        },
      });
    delete user.password;
    return { ...user, isAdmin: payload.isAdmin };
  }
}
