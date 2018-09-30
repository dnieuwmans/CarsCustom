import ColorInterface from '@/interfaces/ColorInterface';

export default class Color implements ColorInterface {
    public static fromJson(json: ColorInterface): Color {
        return new Color(json);
    }

    public id: number;
    public name: string;
    public hex: string;

    constructor(params: ColorInterface) {
        this.id = params.id;
        this.name = params.name;
        this.hex = params.hex;
    }
}