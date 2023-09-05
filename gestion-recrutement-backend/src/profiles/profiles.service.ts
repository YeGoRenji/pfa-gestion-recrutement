import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfiles() {
    return await this.prisma.profile.findMany();
  }

  async createProfile(data: ProfileDto) {
    return await this.prisma.profile.create({
      data: data,
    });
  }

  async removeProfile(id: number) {
    try {
      return await this.prisma.profile.delete({
        where: {
          profileId: id,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == 'P2003')
          throw new InternalServerErrorException('Profile used in an Offer');
      }
    }
  }
}
