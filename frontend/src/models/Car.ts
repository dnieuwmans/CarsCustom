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
    public color: string[];

    constructor(params: CarInterface) {
        this.id = params.id;
        this.brand = params.brand;
        this.type = params.type;
        this.description = params.type;
        this.price = params.price;
        this.image = params.image;
        this.color = params.color;
    }
}
