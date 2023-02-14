import { ConsumptionClasses } from './consumption-classes';

describe('consumptionClassesTests', () => {
  it('shouldReturnEmptyStringWhenIsElegible', () => {
    const verifierConsumptionClasses = new ConsumptionClasses();
    expect(verifierConsumptionClasses.verifyEligibility('Comercial')).toBe('');
  });

  it('should return "Classe de consumo não aceita" when is not elegible', () => {
    const verifierConsumptionClasses = new ConsumptionClasses();
    expect(verifierConsumptionClasses.verifyEligibility('Rural')).toBe(
      'Classe de consumo não aceita',
    );
  });
});
