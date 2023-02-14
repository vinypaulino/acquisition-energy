import { Injectable } from '@nestjs/common';
import { ConsumptionClasses } from '../domain/consumption-classes';
import { TariffModality } from '../domain/tariff-modality';
import { MinConsumption } from '../domain/min-consumption';
import { CreateAcquisitionDto } from 'src/dto/create-acquisition.dto';
import { AcquisitionResponseDTO } from 'src/dto/acquisition-response.dto';
const CO2 = 84;
const kWh = 1000;
@Injectable()
export class Acquisition {
  private reasonsOfIneligibility: Array<string>;

  constructor(
    private readonly verifierConsumptionClasses: ConsumptionClasses,
    private readonly tariffModality: TariffModality,
    private readonly minConsumption: MinConsumption,
  ) {}

  verifyEligibility({
    classeDeConsumo,
    historicoDeConsumo,
    modalidadeTarifaria,
    tipoDeConexao,
  }: CreateAcquisitionDto): AcquisitionResponseDTO {
    this.reasonsOfIneligibility = [];
    const result: string =
      this.verifierConsumptionClasses.verifyEligibility(classeDeConsumo);

    if (result.length > 0) {
      this.reasonsOfIneligibility.push(result);
    }

    const tariffResult: string =
      this.tariffModality.verifyEligibility(modalidadeTarifaria);

    if (tariffResult.length > 0) {
      this.reasonsOfIneligibility.push(tariffResult);
    }

    const minConsumptionResult: string = this.minConsumption.verifyEligibility(
      tipoDeConexao,
      historicoDeConsumo,
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
      economiaAnualDeCO2: calculateCO2(historicoDeConsumo),
    };
  }
}

const calculateCO2 = (history: number[]): number => {
  const consumptionSum = history.reduce((acc, current) => acc + current);
  return Number(((consumptionSum * CO2) / kWh).toFixed(2));
};
