import axios from "axios";
import User from "@/models/User";

export default class UserApi {
    private route: string;

    constructor(route: string, subRoute: string) {
        this.route = `${route}/${subRoute}`;
    }

    public getUsers() {
        return axios.get(`${this.route}/`);
    }

    public getUser(id: number) {
        return axios.get(`${this.route}/${id}`);
    }

    public update(user: User) {
        return axios.post(`${this.route}/update`, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            street: user.street,
            streetNumber: user.streetNumber,
            city: user.city,
            zipCode: user.zipCode,
            phone: user.phone,
        });
    }

    public updateDisabled(user: User) {
        return axios.post(`${this.route}/update/disabled`, {'username': user.username});
    }
}
