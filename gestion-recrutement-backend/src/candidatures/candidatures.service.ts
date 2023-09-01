import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { jobAppDto } from './dto';

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

  async jobApplication(data: jobAppDto, userId: number) {
    return await this.prisma.candidature.create({
      data: {
        candidateId: userId,
        educationLvl: data.educationLvl,
        techSkills: data.techSkills,
        type: 'JOB',
        jobC: {
          create: {
            desiredPosition: data.desiredPosition,
            lastPostOcc: data.lastPostOcc,
            durationOfExp: data.durationOfExp,
          },
        },
      },
    });
  }
}
