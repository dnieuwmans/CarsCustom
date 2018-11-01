import axios from "axios";

// Global route
const route = "http://localhost:5000/api/users";

export default class UserApi {
  public static findAll() {
    return axios.get(`${route}/`);
  }

  public static findOneById(id: number) {
    return axios.get(`${route}/${id}`);
  }

  public static countAll() {
      return axios.get(`${route}/total`);
  }
}
