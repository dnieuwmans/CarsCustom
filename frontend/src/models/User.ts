import UserInterface from '@/interfaces/UserInterface';
import { cloneDeep } from 'lodash';

export default class User implements UserInterface {
    public static fromJson(json: UserInterface) {
        return new User(json);
    }

    public static init() {
        return new User({
            id: -1,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            role: 1,
            street: '',
            streetNumber: '',
            city: '',
            zipCode: '',
            disabled: false,
        })
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public phone: string;
    public email: string;
    public username: string;
    public password: string;
    public confirmPassword: string;
    public role: number;
    public street: string;
    public streetNumber: string;
    public city: string;
    public zipCode: string;
    public disabled: boolean;

    get address() {
        return `${this.street} ${this.streetNumber}, ${this.zipCode} - ${this.city}`;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(params: UserInterface) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.phone = params.phone;
        this.email = params.email;
        this.username = params.username;
        this.password = params.password;
        this.confirmPassword = params.confirmPassword;
        this.role = params.role;
        this.street = params.street;
        this.streetNumber = params.streetNumber;
        this.city = params.city;
        this.zipCode = params.zipCode;
        this.disabled = params.disabled;
    }
}
