import { Injectable } from '@nestjs/common';

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
    return 'Classe de consumo não aceita';
  }
}
