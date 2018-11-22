import AccessoryInterface from '@/interfaces/AccessoryInterface';

export default class Accessory implements AccessoryInterface {
    public static fromJson(json: AccessoryInterface): Accessory {
        return new Accessory(json);
    }

    public id: number;
    public description: string;
    public cost: number;

    constructor(params: AccessoryInterface) {
        this.id = params.id;
        this.description = params.description;
        this.cost = params.cost;
    }

    get formattedCost() {
        return `€${this.cost.toLocaleString('nl-NL')},-`;
    }
}
