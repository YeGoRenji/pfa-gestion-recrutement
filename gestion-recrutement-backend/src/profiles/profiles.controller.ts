import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/auth/decorator';
import { ProfileDto } from './dto';

@UseGuards(JwtGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private profService: ProfilesService) {}

  @Get('all')
  getProfiles(@User('isAdmin') isAdmin: boolean) {
    if (!isAdmin) throw new UnauthorizedException('You should be an Admin !');
    return this.profService.getProfiles();
  }

  @Post('create')
  createProfile(@Body() data: ProfileDto, @User('isAdmin') isAdmin: boolean) {
    if (!isAdmin) throw new UnauthorizedException('You should be an Admin !');
    return this.profService.createProfile(data);
  }

  @Delete('remove/:id')
  removeProfile(
    @Param('id', ParseIntPipe) id: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (!isAdmin) throw new UnauthorizedException('You should be an Admin !');
    return this.profService.removeProfile(id);
  }
}
