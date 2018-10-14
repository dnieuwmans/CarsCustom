import Car from '@/models/Car';
import OrderInterface from '@/interfaces/OrderInterface';

export enum stepsEnum {
    COLOR = 1,
    ACCESSORY,
    SUMMARY,
}

const stepsDef = [
    {
        id: stepsEnum.COLOR,
        name: 'Color',
        completed: 0,
    },
    {
        id: stepsEnum.ACCESSORY,
        name: 'Accessory',
        completed: 0,
    },
    {
        id: stepsEnum.SUMMARY,
        name: 'Summary',
        completed: 0,
    }
];

export class Order implements OrderInterface{
    public static fromJson(json: OrderInterface) {
        return new Order(json);
    }

    public steps: any[];
    public id: number;
    public selectedCar: Car;
    public selectedColor: string;
    public activeStep: number;

    constructor(params: OrderInterface) {
        this.id = params.id;
        this.selectedCar = params.selectedCar;
        this.selectedColor = params.selectedColor;
        this.activeStep = params.activeStep || stepsEnum.COLOR;
        this.steps = params.steps || stepsDef;

        this.store();
    }

    // Every change will be stored in localStorage
    private store() {
        localStorage.setItem('order', JSON.stringify(this));
    }

    // Every changes should be done with a setter because of the localStorage updating action
    public setSelectedColor(color: string): void {
        this.selectedColor = color;

        this.store();
    }

    public nextStep() {
        this.steps[this.activeStep - 1].completed = 100;

        if (this.activeStep !== stepsEnum.SUMMARY) {
            this.activeStep += 1;
        }

        this.store();
    }
}
