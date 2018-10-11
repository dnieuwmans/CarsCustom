import Car from '@/models/Car';
import OrderInterface from '@/interfaces/OrderInterface';

export default class Order implements OrderInterface{
    public static fromJson(json: OrderInterface) {
        return new Order(json);
    }

    public id: number;
    public selectedCar: Car;
    public selectedColor: string;

    // Every changes should be done with a setter because of the localStorage updating action
    public setSelectedColor(color: string): void {
        this.selectedColor = color;

        this.store();
    }

    constructor(params: OrderInterface) {
        console.log(params);

        this.id = params.id;
        this.selectedCar = params.selectedCar;
        this.selectedColor = params.selectedColor;

        this.store();
    }

    private store() {
        localStorage.setItem('order', JSON.stringify(this));
    }
}
