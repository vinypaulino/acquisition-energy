import { TariffModality } from './tariff-modality';

describe('tariffModalityTests', () => {
  it('shouldReturnEmptyStringWhenIsEligible', () => {
    const verifierTariffModality = new TariffModality();
    expect(verifierTariffModality.verifyEligibility('Branca')).toBe('');
  });

  it('should return "Classe de consumo não aceita" when is not eligible', () => {
    const verifierTariffModality = new TariffModality();
    expect(verifierTariffModality.verifyEligibility('Verde')).toBe(
      'Modalidade tarifária não aceita',
    );
  });
});
