import Car from '@/models/Car';
import OrderUser from "@/models/OrderUser";
import Accessory from "@/models/Accessory";
import OrderStatusInterface from '@/interfaces/OrderStatusInterface';

export default interface OrderInterface {
    id: number;
    selectedCar: Car;
    selectedColor: string;
    selectedAccessories: Accessory[];
    orderUser?: OrderUser
    activeStep?: number;
    steps?: any;
    status?: OrderStatusInterface;
    token?: string;
    createdAt?: Date | null;
}
