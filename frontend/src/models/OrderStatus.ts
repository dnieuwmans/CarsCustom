import OrderStatusInterface from '@/interfaces/OrderStatusInterface';

export default class OrderStatus implements OrderStatusInterface {
    public static fromJson(json: OrderStatusInterface): OrderStatus {
        return new OrderStatus(json);
    }

    public id: number;
    public value: string;

    constructor(params: OrderStatusInterface) {
        this.id = params.id;
        this.value = params.value;
    }
}
