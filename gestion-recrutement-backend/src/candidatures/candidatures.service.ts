import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class CandidaturesService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number) {
    const candidatures = await this.prisma.candidature.findMany({
      where: {
        candidateId: userId,
      },
      include: {
        internC: true,
        jobC: true,
        offerC: true,
      },
    });

    return candidatures;
  }
}
