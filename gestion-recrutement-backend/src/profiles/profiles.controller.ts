import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private profService: ProfilesService) {}

  @Get('all')
  getProfiles(@User('isAdmin') isAdmin: boolean) {
    if (!isAdmin) throw new UnauthorizedException('You should be an Admin !');
    return this.profService.getProfiles();
  }
}
