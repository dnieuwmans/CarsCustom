import Car from '@/models/Car';
import OrderInterface from '@/interfaces/OrderInterface';

export default class Order implements OrderInterface{
    public static fromJson(json: OrderInterface) {
        return new Order(json);
    }

    public id: number;
    public selectedCar: Car;
    public selectedColor: string;

    constructor(params: OrderInterface) {
        this.id = params.id;
        this.selectedCar = params.selectedCar;
        this.selectedColor = params.selectedColor;
    }
}