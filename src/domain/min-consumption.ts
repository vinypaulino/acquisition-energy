import { Injectable } from '@nestjs/common';

const MESSAGE_OF_MIN_CONSUMPTION = 'Consumo muito baixo para tipo de conexão';

@Injectable()
export class MinConsumption {
  private minConsumption: Record<string, number> = {
    monofasico: 400,
    bifasico: 500,
    trifasico: 750,
  };

  private consumptionAverage(consumptionHistory: number[]) {
    const sum = consumptionHistory.reduce((acc, current) => acc + current);
    return sum / consumptionHistory.length;
  }

  verifyEligibility(connectType: string, consumptionHistory: number[]): string {
    if (
      this.consumptionAverage(consumptionHistory) >
      this.minConsumption[connectType]
    ) {
      return '';
    }
    return MESSAGE_OF_MIN_CONSUMPTION;
  }
}
