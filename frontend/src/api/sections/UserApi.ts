import axios from "axios";

export default class UserApi {
  private route : string;

  constructor(route: string, subRoute: string) {
    this.route = `${route}/${subRoute}`; 
  }

  public getUsers() {
    return axios.get(`${this.route}/`);
  }
}
