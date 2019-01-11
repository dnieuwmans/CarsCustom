import CarInterface from '@/interfaces/CarInterface';
import Color from '@/models/Color';
import Accessory from '@/models/Accessory'

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
    public accessories: Accessory[];
    public disabled: boolean;


    constructor(params: CarInterface) {
        this.id = params.id;
        this.brand = params.brand;
        this.type = params.type;
        this.description = params.description;
        this.price = params.price;
        this.colors = params.colors.map(Color.fromJson);
        this.imageTemplate = params.imageTemplate;
        this.disabled = params.disabled;

        this.images = this.colors.map(c => {
            return this.imageTemplate.replace('%color%', c.name);
        });

        if (params.accessories == null) {
            this.accessories = [];
        } else {
            this.accessories = params.accessories.map(Accessory.fromJson);
        }
    }

    get formattedPrice() {
        return `€${this.price.toLocaleString('nl-NL')},-`;
    }

    get fullDescription() {
        return `${this.brand}, ${this.type}`;
    }
}
