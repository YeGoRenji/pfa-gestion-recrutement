import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  createOffer(@Body() data: createOfferDto, @User('userId') userId: number) {
    return this.offerService.createOffer(data, userId);
  }
}
