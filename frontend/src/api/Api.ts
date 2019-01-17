import axios from 'axios';

import CarApi from './sections/CarApi';
import AddressApi from './sections/AddressApi';
import AuthApi from './sections/AuthApi';
import OrderApi from './sections/OrderApi';
import UserApi from './sections/UserApi';
import OrderStatusesApi from "@/api/sections/OrderStatusesApi";

// TODO: Maybe grab it from a config file?
const route: string = 'http://localhost:5000/api';

// Note: use sections to keep this file as clean as possible.
export default class Api {

    // Car related api methods.
    public static car = new CarApi(route, 'cars');

    // Address related api methods.
    public static address = new AddressApi(route, 'address');

    // Authenticate related api methods.
    public static auth = new AuthApi(route, 'auth');

    // Order related api methods.
    public static order = new OrderApi(route, 'orders');

    // User related api methods.
    public static user = new UserApi(route, 'users');

    // Order Statuses related api methods.
    public static orderStatuses = new OrderStatusesApi(route, 'orderstatuses');

    // Sets the default headers according to the key and value.
    public static setDefaultHeader = (key: string, value: string) => {
        axios.defaults.headers.common[key] = value;
    };

    // Resets the default headers.
    public static resetDefaultHeaders = () => {
        axios.defaults.headers.common = {};
    };
}