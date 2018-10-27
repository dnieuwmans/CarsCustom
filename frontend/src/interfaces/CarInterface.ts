import Color from '@/models/Color';

export default interface CarInterface {
    id: number;
    brand: string;
    type: string;
    description: string;
    price: number;
    images: string[];
    image_template: string;
    colors: Color[];
}
