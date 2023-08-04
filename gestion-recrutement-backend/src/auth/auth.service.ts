import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signin(dto: AuthSignInDto) {
    const user = await this.prisma.candidate.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const passCorrect = await argon.verify(user.password, dto.password);
    if (!passCorrect) throw new ForbiddenException('Credentials Incorrect');

    return user;
  }
  async signup(dto: AuthSignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.candidate.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          address: dto.address,
          gender: dto.gender,
          dateOfBirth: new Date(dto.dateOfBirth),
          password: hash,
          phone: dto.phone,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
