import axios from "axios";
import { Order } from '@/models/Order';

export default class OrderApi {
  private route : string;

  constructor(route: string, subRoute: string) {
    this.route = `${route}/${subRoute}`; 
  }

  public addOrder(order: any) {
    return axios.post(`${this.route}/`, order);
  }

  public getOrders() {
    return axios.get(`${this.route}/`);
  }

  public getOrderByToken(token: string) {
    return axios.get(`${this.route}/${token}`);
  }
}
