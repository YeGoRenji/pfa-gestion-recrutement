import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.candidate.findMany();
    data.forEach((user) => {
      delete user.password;
    });
    return data;
  }

  async getById(id: number) {
    const user = await this.prisma.candidate.findUnique({
      where: {
        userId: id,
      },
    });

    if (user) delete user.password;
    return user;
  }
}
