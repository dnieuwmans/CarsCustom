import axios from "axios";
import User from '@/models/User';

export default class AuthApi {
    private route : string;
  
    constructor(route: string, subRoute: string) {
      this.route = `${route}/${subRoute}`; 
    }
  
    // TODO: make complete
    public register(user: User) {
        return axios.post(`${this.route}/register`, user);
    }

    public login(username: string, password: string) {
        return axios.post(`${this.route}/login`, {
            username,
            password,
        });
    }  
}
  