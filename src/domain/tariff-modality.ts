export default class TariffModality {
  private eligibleClasses: string[];

  constructor() {
    this.eligibleClasses = ['convencional', 'branca'];
  }

  verifyEligibility(tariffModality: string): string {
    if (this.eligibleClasses.includes(tariffModality.toLowerCase())) {
      return '';
    }

    return 'Modalidade tarifária não aceita';
  }
}
