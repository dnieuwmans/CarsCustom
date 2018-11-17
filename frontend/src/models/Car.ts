import CarInterface from '@/interfaces/CarInterface';
import Color from '@/models/Color';

export default class Car implements CarInterface {
    public static fromJson(json: any) {
        json.imageTemplate = json.image_template || json.imageTemplate; // because of data mapping

        return new Car(json);
    }

    public id: number;
    public brand: string;
    public type: string;
    public description: string;
    public price: number;
    public colors: Color[];
    public imageTemplate: string;
    public images: string[];


    constructor(params: CarInterface) {
        this.id = params.id;
        this.brand = params.brand;
        this.type = params.type;
        this.description = params.description;
        this.price = params.price;
        this.colors = params.colors.map(Color.fromJson);
        this.imageTemplate = params.imageTemplate;

        this.images = this.colors.map(c => {
            return this.imageTemplate.replace('%color%', c.name);
        })
    }

    get formattedPrice() {
        return `€${this.price.toLocaleString('nl-NL')},-`;
    }

    get fullDescription() {
        return `${this.brand}, ${this.type}`;
    }
}
