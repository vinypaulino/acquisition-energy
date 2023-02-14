import { Test, TestingModule } from '@nestjs/testing';
import { AcquisitionController } from './acquisition.controller';
import { ConsumptionClasses } from './domain/consumption-classes';
import { MinConsumption } from './domain/min-consumption';
import { TariffModality } from './domain/tariff-modality';
import { Acquisition } from './use-cases/acquisition.use-case';

describe('AppController', () => {
  let acquisitionController: AcquisitionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AcquisitionController],
      providers: [
        Acquisition,
        ConsumptionClasses,
        TariffModality,
        MinConsumption,
      ],
    }).compile();

    acquisitionController = app.get<AcquisitionController>(
      AcquisitionController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        acquisitionController.verifyEligibility({
          numeroDoDocumento: '14041737706',
          tipoDeConexao: 'bifasico',
          classeDeConsumo: 'rural',
          modalidadeTarifaria: 'verde',
          historicoDeConsumo: [
            3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
          ],
        }),
      ).toEqual({
        elegivel: false,
        razoesInelegibilidade: [
          'Classe de consumo não aceita',
          'Modalidade tarifária não aceita',
        ],
      });
    });
  });
});
