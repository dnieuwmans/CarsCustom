import axios from "axios";

export default class AuthApi {
    private route : string;
  
    constructor(route: string, subRoute: string) {
      this.route = `${route}/${subRoute}`; 
    }
  
    // TODO: make complete
    public register(username: string, password: string) {
        return axios.post(`${this.route}/register`, {
            username,
            password,
        });
    }

    public login(username: string, password: string) {
        return axios.post(`${this.route}/login`, {
            username,
            password,
        });
    }  
}
  