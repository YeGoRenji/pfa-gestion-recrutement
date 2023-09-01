import { IsNotEmpty } from 'class-validator';

export class jobAppDto {
  @IsNotEmpty()
  educationLvl: string;
  @IsNotEmpty()
  techSkills: string;
  @IsNotEmpty()
  internshipDuratio: string;
  @IsNotEmpty()
  desiredPosition: string;
  @IsNotEmpty()
  durationOfExp: number;
  @IsNotEmpty()
  lastPostOcc: string;
}
