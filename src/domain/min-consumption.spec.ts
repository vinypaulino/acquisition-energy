import MinConsumption from './min-consumption';
describe('minConsumptionTests', () => {
  it('shouldReturnEmptyStringWhenIsEligible', () => {
    const historicoDeConsumo: number[] = [
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
    ];
    const verifierMinConsumption = new MinConsumption();
    expect(
      verifierMinConsumption.verifyEligibility(
        'monofasico',
        historicoDeConsumo,
      ),
    ).toBe('');
  });

  it('should return "Classe de consumo não aceita" when is not elegible', () => {
    const historicoDeConsumo: number[] = [
      387, // mes atual
      976, // mes anterior
      597, // 2 meses atras
      279, // 3 meses atras
      248, // 4 meses atras
      573, // 5 meses atras
      753, // 6 meses atras
      439, // 7 meses atras
      785, // 8 meses atras
      416, // 9 meses atras
    ];

    const verifierMinConsumption = new MinConsumption();
    expect(
      verifierMinConsumption.verifyEligibility('trifasico', historicoDeConsumo),
    ).toBe('Consumo muito baixo para tipo de conexão');
  });
});
