import { Controller, Get } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private offerService: OffersService) {}

  @Get('all')
  getOffers() {
    return this.offerService.getAll();
  }
}
