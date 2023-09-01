import {
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Body,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CandidaturesService } from './candidatures.service';
import { jobAppDto } from './dto';

@UseGuards(JwtGuard)
@Controller('candidatures')
export class CandidaturesController {
  constructor(private candidatureService: CandidaturesService) {}

  @Get('me')
  getMyCandidatures(
    @User('userId') userId: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (isAdmin) throw new UnauthorizedException('You should be a candidate !');
    return this.candidatureService.getMe(userId);
  }

  @Post('job')
  jobApplication(
    @Body() data: jobAppDto,
    @User('userId') userId: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (isAdmin) throw new UnauthorizedException('You should be a candidate !');
    return this.candidatureService.jobApplication(data, userId);
  }
}
