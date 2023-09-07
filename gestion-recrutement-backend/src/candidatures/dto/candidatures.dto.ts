import { InternshipType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class jobAppDto {
  @IsNotEmpty()
  educationLvl: string;

  @IsNotEmpty()
  techSkills: string;

  @IsNotEmpty()
  desiredPosition: string;

  @IsNotEmpty()
  @IsNumber()
  durationOfExp: number;

  @IsNotEmpty()
  lastPostOcc: string;
}

export class internshipAppDto {
  @IsNotEmpty()
  educationLvl: string;

  @IsNotEmpty()
  techSkills: string;

  @IsNotEmpty()
  @IsNumber()
  internshipDuratio: number;

  @IsNotEmpty()
  desiredTechnology: string;

  @IsNotEmpty()
  @IsEnum(InternshipType)
  type: InternshipType;
}

export class offerAppDto {
  @IsNotEmpty()
  @IsNumber()
  offerId: number;

  @IsNotEmpty()
  educationLvl: string;

  @IsNotEmpty()
  techSkills: string;

  @IsNotEmpty()
  @IsNumber()
  durationOfExp: number;
}

export class approveAppDto {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
