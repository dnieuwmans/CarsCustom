import Car from '@/models/Car';

export default interface OrderInterface {
    id: number;
    selectedCar: Car;
    selectedColor: string;
    activeStep?: number;
    steps?: any;
}
