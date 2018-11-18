import Car from '@/models/Car';
import OrderUser from "@/models/OrderUser";
import OrderStatusInterface from '@/models/OrderStatusInterface';

export default interface OrderInterface {
    id: number;
    selectedCar: Car;
    selectedColor: string;
    orderUser?: OrderUser
    activeStep?: number;
    steps?: any;
    status?: OrderStatusInterface;
    token?: string;
}
