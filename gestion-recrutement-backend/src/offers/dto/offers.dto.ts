import { Location, OfferType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class createOfferDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNumber()
  @Min(1)
  nbOfPositions: number;

  @IsDateString()
  deadline: Date;

  @IsNotEmpty()
  @IsString()
  contract: string;

  @IsEnum(OfferType)
  type: OfferType;

  @IsEnum(Location)
  location: Location;

  @IsNumber()
  concernId: number;
}
