import { Controller, Get, UseGuards } from '@nestjs/common';
import { Administrator, Candidate } from '@prisma/client';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('candidates')
export class CandidatesController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@User() user: Candidate | Administrator) {
    return user;
  }
}
