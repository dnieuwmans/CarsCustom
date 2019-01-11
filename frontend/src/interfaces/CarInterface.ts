import Color from '@/models/Color';
import Accessory from '@/models/Accessory';

export default interface CarInterface {
    id: number;
    brand: string;
    type: string;
    description: string;
    price: number;
    images: string[];
    imageTemplate: string;
    colors: Color[];
    accessories: Accessory[];
    disabled: boolean;

    image_template?: string;
}
