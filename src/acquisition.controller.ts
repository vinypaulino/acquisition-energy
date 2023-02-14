import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { CreateAcquisitionDto } from './dto/create-acquisition.dto';
import { Acquisition } from './use-cases/acquisition.use-case';

@Controller('acquisition')
export class AcquisitionController {
  constructor(private readonly acquisitionService: Acquisition) {}

  @Post()
  verifyEligibility(@Body() accountOfCustomer: CreateAcquisitionDto): any {
    return this.acquisitionService.verifyEligibility(accountOfCustomer);
  }
}
