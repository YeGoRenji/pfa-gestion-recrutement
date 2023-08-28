import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserObj } from 'src/auth/startegy';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
@UseGuards(JwtGuard)
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  @Get('me')
  getMe(@User() user: UserObj) {
    return user;
  }

  @Get('all')
  getAll(@User('isAdmin') isAdmin: boolean) {
    if (!isAdmin) throw new UnauthorizedException('You are not admin');
    return this.candidatesService.getAll();
  }

  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (!isAdmin) throw new UnauthorizedException('You are not admin');
    return this.candidatesService.getById(id);
  }
}
