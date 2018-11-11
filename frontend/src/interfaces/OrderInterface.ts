import Car from '@/models/Car';
import OrderUser from "@/models/OrderUser";

export default interface OrderInterface {
    id: number;
    selectedCar: Car;
    selectedColor: string;
    orderUser?: OrderUser
    activeStep?: number;
    steps?: any;
    status?: number;
}
