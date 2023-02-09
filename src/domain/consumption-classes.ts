export default class ConsumptionClasses {
    private eligibleClasses: string[];

    constructor() {
        this.eligibleClasses = ['Comercial', 'Residencial', 'Industrial']
    }

    verifyEligibility(clientClass: string): string {
        if (this.eligibleClasses.includes(clientClass)) {
            return '';
        }

        return 'Classe de consumo não aceita';
    }

}