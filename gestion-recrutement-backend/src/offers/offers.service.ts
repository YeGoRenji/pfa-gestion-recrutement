import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.offer.findMany({
      include: {
        profile: true,
      },
    });
  }
}
