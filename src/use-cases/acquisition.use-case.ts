import TariffModality from '../../src/domain/tariff-modality';
import ConsumptionClasses from '../../src/domain/consumption-classes';
import MinConsumption from '../../src/domain/min-consumption';

export default class Acquisition {
  private verifierConsumptionClasses: ConsumptionClasses;
  private reasonsOfIneligibility: Array<string> = [];
  private tariffModality: TariffModality;
  private minConsumption: MinConsumption;

  constructor() {
    this.verifierConsumptionClasses = new ConsumptionClasses();
    this.tariffModality = new TariffModality();
    this.minConsumption = new MinConsumption();
  }

  verifyEligibility(accountOfCustomer: {
    numeroDoDocumento: string;
    tipoDeConexao: string;
    classeDeConsumo: string;
    modalidadeTarifaria: string;
    historicoDeConsumo: number[];
  }) {
    const result: string = this.verifierConsumptionClasses.verifyEligibility(
      accountOfCustomer.classeDeConsumo,
    );

    if (result.length > 0) {
      this.reasonsOfIneligibility.push(result);
    }

    const tariffResult: string = this.tariffModality.verifyEligibility(
      accountOfCustomer.modalidadeTarifaria,
    );

    if (tariffResult.length > 0) {
      this.reasonsOfIneligibility.push(tariffResult);
    }

    const minConsumptionResult: string = this.minConsumption.verifyEligibility(
      accountOfCustomer.tipoDeConexao,
      accountOfCustomer.historicoDeConsumo,
    );

    if (minConsumptionResult.length > 0) {
      this.reasonsOfIneligibility.push(minConsumptionResult);
    }

    if (this.reasonsOfIneligibility.length > 0) {
      return {
        elegivel: false,
        razoesInelegibilidade: this.reasonsOfIneligibility,
      };
    }
    return {
      elegivel: true,
      economiaAnualDeCO2: calculateCO2(accountOfCustomer.historicoDeConsumo),
    };
  }
}
const calculateCO2 = (history: number[]) => {
  const consumptionSum = history.reduce((acc, current) => acc + current);
  return Number(((consumptionSum * 84) / 1000).toFixed(2));
};
