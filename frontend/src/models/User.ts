import UserInterface from '@/interfaces/UserInterface';

export default class User implements UserInterface {
    public static fromJson(json: UserInterface) {
        return new User(json);
    }

    public static init() {
        return new User({
            id: -1,
            firstName: '',
            lastName: '',
            street: '',
            streetNumber: '',
            city: '',
            zipCode: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            role_id: 1 // todo sjoerd => enum user
        })
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public phone: string;
    public email: string;
    public username: string;
    public password: string;
    public role_id: number;
    public street: string;
    public streetNumber: string;
    public city: string;
    public zipCode: string;

    constructor(params: UserInterface) {
        this.id = params.id;
        this.firstName = params.first_name;
        this.lastName = params.last_name;
        this.phone = params.phone;
        this.email = params.email;
        this.username = params.username;
        this.password = params.password;
        this.role_id = params.role_id;
        this.street = params.street;
        this.streetNumber = params.streetNumber;
        this.city = params.city;
        this.zipCode = params.zipCode;
    }
}
