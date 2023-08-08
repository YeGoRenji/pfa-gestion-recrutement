import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CandidaturesService } from './candidatures.service';

@Controller('candidatures')
@UseGuards(JwtGuard)
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
}
