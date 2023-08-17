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
export class CandidaturesController {
  constructor(private candidatureService: CandidaturesService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMyCandidatures(
    @User('userId') userId: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (isAdmin) throw new UnauthorizedException('You should be a candidate !');
    return this.candidatureService.getMe(userId);
  }

  @Get('test')
  test() {
    return { message: 'Hello Front :) !' };
  }
}
