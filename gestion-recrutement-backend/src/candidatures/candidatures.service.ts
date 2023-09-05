import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { internshipAppDto, jobAppDto, offerAppDto } from './dto';

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

  async internshipApplication(data: internshipAppDto, userId: number) {
    return await this.prisma.candidature.create({
      data: {
        candidateId: userId,
        educationLvl: data.educationLvl,
        techSkills: data.techSkills,
        type: 'INTERNSHIP',
        internC: {
          create: {
            desiredTechnology: data.desiredTechnology,
            InternshipDuration: data.internshipDuratio,
            internType: data.type,
          },
        },
      },
    });
  }

  async offerApplication(data: offerAppDto, userId: number) {
    const offer = await this.prisma.offer.findUnique({
      where: {
        offerId: data.offerId,
      },
    });

    if (!offer) throw new NotFoundException('Offer not found');

    return await this.prisma.candidature.create({
      data: {
        candidateId: userId,
        educationLvl: data.educationLvl,
        techSkills: data.techSkills,
        type: 'OFFER',
        offerC: {
          create: {
            durationOfExp: data.durationOfExp,
            offerId: data.offerId,
          },
        },
      },
    });
  }

  async getAll() {
    const data = await this.prisma.candidature.findMany({
      include: {
        internC: true,
        jobC: true,
        offerC: true,
      },
    });
    const simplified = data.map((element) => {
      const forC = element.internC || element.offerC || element.jobC;
      // delete element.internC;
      // delete element.offerC;
      // delete element.jobC;
      element['details'] = forC;
      return element;
    });
    return simplified;
  }
}
