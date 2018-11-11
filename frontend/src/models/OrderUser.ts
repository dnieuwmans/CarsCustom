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
            street: '',
            streetNumber: '',
            city: '',
            zipCode: '',
            phone: '',
            email: '',
        })
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public street: string;
    public streetNumber: string;
    public city: string;
    public zipCode: string;
    public phone: string;
    public email: string;

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get address() {
        return `${this.street} ${this.streetNumber}, ${this.zipCode} - ${this.city}`;
    }

    constructor(params: OrderUserInterface) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.street = params.street;
        this.streetNumber = params.streetNumber;
        this.city = params.city;
        this.zipCode = params.zipCode;
        this.phone = params.phone;
        this.email = params.email;
    }
}