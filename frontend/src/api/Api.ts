import CarApi from './sections/CarApi';
import AddressApi from './sections/AddressApi';
import AuthApi from './sections/AuthApi';

const route: string = 'http://localhost:5000/api';

// Note: use sections to keep this file as clean as possible.
export default class Api {

    // Car related api methods.
    public static car = new CarApi(route, 'cars');

    // Address related api methods.
    // Note: this api section doesn't talk to our own api.
    public static address = new AddressApi();

    // TODO: implement
    public static user = {}

    // Authenticate related api methods.
    public static auth = new AuthApi(route, 'auth');
}