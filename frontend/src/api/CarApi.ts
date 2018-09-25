import axios from "axios";

// Global route
const route = "http://localhost:5000/api/cars";

export default class CarApi {
  public static findAll() {
    return axios.get(`${route}/`);
  }

  public static findOneById(id: number) {
    return axios.get(`${route}/${id}`);
  }
}
