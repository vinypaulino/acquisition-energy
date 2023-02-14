import { Module } from '@nestjs/common';
import { AcquisitionController } from './acquisition.controller';
import { Acquisition } from './use-cases/acquisition.use-case';
import { ConsumptionClasses } from './domain/consumption-classes';
import { TariffModality } from './domain/tariff-modality';
import { MinConsumption } from './domain/min-consumption';

@Module({
  imports: [],
  controllers: [AcquisitionController],
  providers: [Acquisition, ConsumptionClasses, TariffModality, MinConsumption],
})
export class AppModule {}
