import axios from "axios";
import Car from '@/models/Car';

export default class CarApi {
  private route : string;

  constructor(route: string, subRoute: string) {
    this.route = `${route}/${subRoute}`; 
  }

  public findAll(dashboard = false) {
    if (dashboard) {
        return axios.get(`${this.route}/all`);
    }

    return axios.get(`${this.route}/`);
  }

  public findOneById(id: number) {
    return axios.get(`${this.route}/${id}`);
  }

  public countAll() {
      return axios.get(`${this.route}/total`);
  }

  public updateDisabled(car: Car) {
    return axios.post(`${this.route}/update/disabled`, { 'id': car.id });
  }
}
