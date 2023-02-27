const CO2 = 84;
const kWh = 1000;
const YEAR_IN_MONTHS = 12;

export const calculateCO2 = (history: number[]): number => {
  const consumptionSum = history.reduce((acc, current) => acc + current);

  if (history.length < YEAR_IN_MONTHS) {
    const consumptionAverage = consumptionSum / history.length;
    const annualConsumptionProjection = consumptionAverage * YEAR_IN_MONTHS;
    return Number(((annualConsumptionProjection * 84) / 1000).toFixed(2));
  }

  return Number(((consumptionSum * CO2) / kWh).toFixed(2));
};
