import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { internshipAppDto, jobAppDto, offerAppDto } from './dto';

@Injectable()
export class CandidaturesService {
  constructor(private prisma: PrismaService) {}
  async getMe(userId: number) {
    const data = await this.prisma.candidature.findMany({
      include: {
        internC: true,
        jobC: true,
        offerC: true,
      },
      where: {
        candidateId: userId,
      },
    });
    const simplified = data.map((element) => {
      const forC = element.internC || element.offerC || element.jobC;
      element['details'] = forC;
      return element;
    });
    return simplified;
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

    const candidates = await this.prisma.candidate.findMany({
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    });

    const simplified = data.map((element) => {
      const forC = element.internC || element.offerC || element.jobC;
      const candidate = candidates.find(
        ({ userId }) => userId == element.candidateId,
      );
      element['Name'] = `${candidate.firstName}, ${candidate.lastName}`;
      element['Phone'] = candidate.phone;
      delete element['candidateId'];
      element['details'] = forC;
      return element;
    });
    return simplified;
  }

  async apporveApp(id: number, status: boolean) {
    return await this.prisma.candidature.update({
      data: {
        status,
      },
      where: {
        candidatureId: id,
      },
    });
  }
}
