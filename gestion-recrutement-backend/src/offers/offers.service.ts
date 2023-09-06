import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOfferDto } from './dto';

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

  async createOffer(data: createOfferDto, userId: number) {
    return await this.prisma.offer.create({
      data: { ...data, managerId: userId, isArchived: false },
    });
  }
}
