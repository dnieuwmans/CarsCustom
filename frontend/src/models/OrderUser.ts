import OrderUserInterface from '@/interfaces/OrderUserInterface';

export default class OrderUser implements OrderUserInterface {
    public static fromJson(json: OrderUserInterface) {
        return new OrderUser(json);
    }

    public static init() {
        return new OrderUser({
            id: -1,
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zipCode: '',
            phone: '',
            email: '',
        })
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public zipCode: string;
    public phone: string;
    public email: string;

    constructor(params: OrderUserInterface) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.address = params.address;
        this.city = params.city;
        this.zipCode = params.zipCode;
        this.phone = params.phone;
        this.email = params.email;
    }
}