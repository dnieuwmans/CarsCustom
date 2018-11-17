import Car from '@/models/Car';
import OrderInterface from '@/interfaces/OrderInterface';
import OrderUser from "@/models/OrderUser";
import { cloneDeep } from 'lodash';

export enum stepsEnum {
    COLOR = 1,
    ACCESSORY,
    USER_INFO,
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
        id: stepsEnum.USER_INFO,
        name: 'User Info',
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

    public id: number;
    public selectedCar: Car;
    public selectedColor: string;
    public orderUser: OrderUser;
    public activeStep: number;
    public steps: any[];
    public status: number;
    public token: string;

    get activeStepName() {
        return this.steps[this.activeStep - 1].name;
    }

    get totalPrice() {
        // TODO: implement correctly
        let price = this.selectedCar.price;

        return `€${price.toLocaleString('nl-NL')},-`;
    }

    get selectedColorObject() {
        const name = this.selectedCar.colors[this.selectedColor as any].name;

        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    constructor(params: OrderInterface) {
        this.id = params.id;
        this.selectedCar = params.selectedCar;
        this.selectedColor = params.selectedColor;
        this.orderUser = new OrderUser(params.orderUser || OrderUser.init());
        this.activeStep = params.activeStep || stepsEnum.COLOR;
        this.steps = params.steps || stepsDef;
        this.status = params.status || 0;
        this.token = params.token || '';
    }

    public toJson() {
        // Make sure to remove all the references...
        const order = cloneDeep(this);

        let selectedColor = order.selectedCar.colors[order.selectedColor as any];

        return {
            car: order.selectedCar,
            user: order.orderUser,
            selectedColor,
        }
    }
}
