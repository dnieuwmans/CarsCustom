import axios from 'axios';

// Global route
const route = 'api/cars';

export default class CarApi {
  public static findAll() {
    return axios.get(`${route}/`);
  }

  public static findOneById(id: number) {
    return axios.get(`${route}/${id}`);
  }
}
