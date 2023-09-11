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
      data: {
        ...data,
        deadline: new Date(data.deadline),
        managerId: userId,
        isArchived: false,
      },
    });
  }

  async removeOffer(id: number) {
    return await this.prisma.offer.delete({
      where: {
        offerId: id,
      },
    });
  }

  async archiveOffer(id: number, status: boolean) {
    return await this.prisma.offer.update({
      data: {
        isArchived: status,
      },
      where: {
        offerId: id,
      },
    });
  }
}
