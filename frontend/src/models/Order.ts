import Car from '@/models/Car';
import OrderInterface from '@/interfaces/OrderInterface';
import OrderUser from "@/models/OrderUser";
import { cloneDeep } from 'lodash';
import OrderStatus from '@/models/OrderStatus';
import Accessory from '@/models/Accessory';

export enum stepsEnum {
    COLOR = 1,
    ACCESSORY,
    USER_INFO,
    SUMMARY,
}

const stepsDef = [
    {
        id: stepsEnum.COLOR,
        name: 'Select Color',
        completed: 0,
    },
    {
        id: stepsEnum.ACCESSORY,
        name: 'Select Accessory',
        completed: 0,
    },
    {
        id: stepsEnum.USER_INFO,
        name: 'Buyer Information',
        completed: 0,
    },
    {
        id: stepsEnum.SUMMARY,
        name: 'Review Order',
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
    public selectedAccessories: Accessory[];
    public orderUser: OrderUser;
    public activeStep: number;
    public steps: any[];
    public status: OrderStatus;
    public token: string;

    get activeStepName() {
        return this.steps[this.activeStep - 1].name;
    }

    get totalPrice() {
        // TODO: implement correctly
        let price = this.selectedCar.price;

        this.selectedAccessories.forEach(accessory => {
            price += accessory.cost;
        });

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
        this.selectedAccessories = (params.selectedAccessories) ? params.selectedAccessories.map(Accessory.fromJson) : []; // TODO: remove if after added to db
        this.orderUser = new OrderUser(params.orderUser || OrderUser.init());
        this.activeStep = params.activeStep || stepsEnum.COLOR;
        this.steps = params.steps || cloneDeep(stepsDef);
        this.token = params.token || '';

        if (params.status == null) {
            this.status = new OrderStatus({ id: 0, value: 'New'});
        } else {
            this.status = OrderStatus.fromJson(params.status);
        }
    }

    public toJson() {
        // Make sure to remove all the references...
        const order = cloneDeep(this);

        let selectedColor = order.selectedCar.colors[order.selectedColor as any];

        return {
            car: order.selectedCar,
            user: order.orderUser,
            selectedColor,
            selectedAccessories: order.selectedAccessories,
        }
    }
}
