import axios from "axios";

export default class OrderStatusesApi {
    private route: string;

    constructor(route: string, subRoute: string) {
        this.route = `${route}/${subRoute}`;
    }

    public getStatuses() {
        return axios.get(`${this.route}/`);
    }
}
