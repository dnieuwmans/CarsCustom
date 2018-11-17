import UserInterface from '@/interfaces/UserInterface';
import { cloneDeep } from 'lodash';

export default class User implements UserInterface {
    public static fromJson(json: UserInterface) {
        return new User(json);
    }

    public static init() {
        return new User({
            id: -1,
            firstName: 'Sjoerd',
            lastName: 'Kraan',
            phone: '0612345678',
            email: 'test@hotmail.com',
            username: 'meneer_sjoerd',
            password: 'testadmin',
            confirmPassword: 'testadmin',
            role_id: 1, // todo sjoerd => enum user
            street: 'greenhof',
            streetNumber: '14',
            city: 'hazwdaddie',
            zipCode: '2394at',
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
    public role_id: number;
    public street: string;
    public streetNumber: string;
    public city: string;
    public zipCode: string;

    constructor(params: UserInterface) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.phone = params.phone;
        this.email = params.email;
        this.username = params.username;
        this.password = params.password;
        this.confirmPassword = params.confirmPassword;
        this.role_id = params.role_id;
        this.street = params.street;
        this.streetNumber = params.streetNumber;
        this.city = params.city;
        this.zipCode = params.zipCode;
    }
}
