import axios from 'axios';

import CarApi from './sections/CarApi';
import AddressApi from './sections/AddressApi';
import AuthApi from './sections/AuthApi';
import OrderApi from './sections/OrderApi';
import UserApi from './sections/UserApi';

const route: string = 'http://localhost:5000/api';

// Note: use sections to keep this file as clean as possible.
export default class Api {

    // Car related api methods.
    public static car = new CarApi(route, 'cars');

    // Address related api methods.
    // Note: this api section doesn't talk to our own api.
    public static address = new AddressApi();

    // Authenticate related api methods.
    public static auth = new AuthApi(route, 'auth');

    // Order related api methods.
    public static order = new OrderApi(route, 'orders');

    // User related api methods.
    public static user = new UserApi(route, 'users');

    // Sets the default headers according to the key and value.
    public static setDefaultHeader = (key: string, value: string) => {
        axios.defaults.headers.common[key] = value;
    }
}