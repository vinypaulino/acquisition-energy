import { Injectable } from '@nestjs/common';

const MESSAGE_CONSUMPTION_CLASSES = 'Classe de consumo não aceita';
@Injectable()
export class ConsumptionClasses {
  private eligibleClasses: string[];
  constructor() {
    this.eligibleClasses = ['comercial', 'residencial', 'industrial'];
  }
  verifyEligibility(clientClass: string): string {
    if (this.eligibleClasses.includes(clientClass.toLowerCase())) {
      return '';
    }
    return MESSAGE_CONSUMPTION_CLASSES;
  }
}
