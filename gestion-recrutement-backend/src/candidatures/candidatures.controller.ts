import {
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CandidaturesService } from './candidatures.service';
import { approveAppDto, internshipAppDto, jobAppDto, offerAppDto } from './dto';

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

  @Post('internship')
  internshipApplication(
    @Body() data: internshipAppDto,
    @User('userId') userId: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (isAdmin) throw new UnauthorizedException('You should be a candidate !');
    return this.candidatureService.internshipApplication(data, userId);
  }

  @Post('offer')
  offerApplication(
    @Body() data: offerAppDto,
    @User('userId') userId: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (isAdmin) throw new UnauthorizedException('You should be a candidate !');
    return this.candidatureService.offerApplication(data, userId);
  }

  @Get('all')
  getAllCandidatures(@User('isAdmin') isAdmin: boolean) {
    if (!isAdmin) throw new UnauthorizedException('You should be an admin !');
    return this.candidatureService.getAll();
  }

  @Post('/approve/:id')
  approveApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: approveAppDto,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (!isAdmin) throw new UnauthorizedException('You should be an admin !');
    return this.candidatureService.apporveApp(id, data.status);
  }
}
