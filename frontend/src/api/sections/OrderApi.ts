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

  public updateOrderStatus(order: any) {
      return axios.post(`${this.route}/${order.id}/update-status`, order);
  }

  public getOrders() {
    return axios.get(`${this.route}/`);
  }

  public getOrderById(id: number) {
    return axios.get(`${this.route}/${id}`);
  }

  public getMyOrders() {
      return axios.get(`${this.route}/my-orders`);
  }
}
