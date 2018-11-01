import UserInterface from '@/interfaces/UserInterface';

export default class User implements UserInterface {
    public static fromJson(json: UserInterface) {
        return new User(json);
    }

    public id: number;
    public first_name: string;
    public last_name: string;
    public adres: string;
    public phone: number;
    public email: string;
    public username: string;
    public password: string;
    public role_id: number;

    constructor(params: UserInterface) {
        this.id = params.id;
        this.first_name = params.first_name;
        this.last_name = params.last_name;
        this.adres = params.adres;
        this.phone = params.phone;
        this.email = params.email;
        this.username = params.username;
        this.password = params.password;
        this.role_id = params.role_id;
    }
}
