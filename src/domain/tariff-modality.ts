import { Injectable } from '@nestjs/common';

const MESSAGE_OF_TARIFF_MODALITY = 'Modalidade tarifária não aceita';
@Injectable()
export class TariffModality {
  private eligibleClasses: string[];

  constructor() {
    this.eligibleClasses = ['convencional', 'branca'];
  }

  verifyEligibility(tariffModality: string): string {
    if (this.eligibleClasses.includes(tariffModality.toLowerCase())) {
      return '';
    }

    return MESSAGE_OF_TARIFF_MODALITY;
  }
}
