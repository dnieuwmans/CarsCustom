import CarInterface from '@/interfaces/CarInterface';

export default class Car implements CarInterface {
    public static fromJson(json: CarInterface) {
        return new Car(json);
    }

    public id: number;
    public brand: string;
    public type: string;
    public description: string;
    public price: number;
    public image: string;
    public colors: string[];

    constructor(params: CarInterface) {
        this.id = params.id;
        this.brand = params.brand;
        this.type = params.type;
        this.description = params.description;
        this.price = params.price;
        this.image = params.image;
        this.colors = params.colors;
    }

    get formattedPrice() {
        return `€${this.price.toLocaleString('nl-NL')},-`;
    }
}
