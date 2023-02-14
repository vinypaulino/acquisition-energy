import { ConsumptionClasses } from '../../src/domain/consumption-classes';
import { MinConsumption } from '../../src/domain/min-consumption';
import { TariffModality } from '../../src/domain/tariff-modality';
import { Acquisition } from './acquisition.use-case';

describe('acquisitionServiceTests', () => {
  let consumptionClasses: ConsumptionClasses;
  let tariffModality: TariffModality;
  let minConsumption: MinConsumption;
  let acquisition: Acquisition;

  beforeAll(() => {
    consumptionClasses = new ConsumptionClasses();
    tariffModality = new TariffModality();
    minConsumption = new MinConsumption();
  });

  beforeEach(() => {
    acquisition = new Acquisition(
      consumptionClasses,
      tariffModality,
      minConsumption,
    );
  });
  it('should return eligible false and reasons of ineligible', () => {
    const notEligibleAccount = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'rural',
      modalidadeTarifaria: 'verde',
      historicoDeConsumo: [
        3878, // mes atual
        9760, // mes anterior
        5976, // 2 meses atras
        2797, // 3 meses atras
        2481, // 4 meses atras
        5731, // 5 meses atras
        7538, // 6 meses atras
        4392, // 7 meses atras
        7859, // 8 meses atras
        4160, // 9 meses atras
      ],
    };

    const returned = acquisition.verifyEligibility(notEligibleAccount);
    expect(returned).toEqual({
      elegivel: false,
      razoesInelegibilidade: [
        'Classe de consumo não aceita',
        'Modalidade tarifária não aceita',
      ],
    });
  });

  it('should return eligible true and calc of co2', () => {
    const eligibleAccount = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, // mes atual
        9760, // mes anterior
        5976, // 2 meses atras
        2797, // 3 meses atras
        2481, // 4 meses atras
        5731, // 5 meses atras
        7538, // 6 meses atras
        4392, // 7 meses atras
        7859, // 8 meses atras
        4160, // 9 meses atras
        6941, // 10 meses atras
        4597, // 11 meses atras
      ],
    };

    const result = acquisition.verifyEligibility(eligibleAccount);

    expect(result).toEqual({
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    });
  });
});
