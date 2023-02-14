import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AcquisitionResponseDTO } from './dto/acquisition-response.dto';
import { CreateAcquisitionDto } from './dto/create-acquisition.dto';
import { Acquisition } from './use-cases/acquisition.use-case';

@Controller('acquisition')
export class AcquisitionController {
  constructor(private readonly acquisitionService: Acquisition) {}

  @Post()
  verifyEligibility(
    @Body() accountOfCustomer: CreateAcquisitionDto,
  ): AcquisitionResponseDTO {
    return this.acquisitionService.verifyEligibility(accountOfCustomer);
  }
}
