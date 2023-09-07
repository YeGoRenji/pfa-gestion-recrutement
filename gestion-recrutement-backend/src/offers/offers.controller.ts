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
import { OffersService } from './offers.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/auth/decorator';
import { createOfferDto } from './dto';

@Controller('offers')
export class OffersController {
  constructor(private offerService: OffersService) {}

  @Get('all')
  getOffers() {
    return this.offerService.getAll();
  }

  @Post('create')
  @UseGuards(JwtGuard)
  createOffer(
    @Body() data: createOfferDto,
    @User('isAdmin') isAdmin: boolean,
    @User('userId') userId: number,
  ) {
    if (!isAdmin) throw new UnauthorizedException('You should be an Admin !');
    return this.offerService.createOffer(data, userId);
  }

  @Delete('remove/:id')
  @UseGuards(JwtGuard)
  removeOffer(
    @Param('id', ParseIntPipe) id: number,
    @User('isAdmin') isAdmin: boolean,
  ) {
    if (!isAdmin) throw new UnauthorizedException('You should be an Admin !');
    return this.offerService.removeOffer(id);
  }
}
