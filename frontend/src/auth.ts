import User from '@/models/User';
import axios, { AxiosPromise } from 'axios';
import Vue from 'vue';

// TODO: maybe we need an auth api service
const loginUrl = 'http://localhost:5000/api/auth/login';

interface IAuth {
    isAuthenticated() : boolean;
    isLoaded() : boolean;
    login(username: string, password: string) : AxiosPromise;
    logout() : void;
    refresh() : void;
}

class Auth implements IAuth {
    _user: User | null;

    constructor() {
        this._user = null;
    }

    get user() {
        return (this.isLoaded()) ? this._user : null;
    }

    /**
     * Returns a boolean whether the user is logged in.
     */
    isAuthenticated(): boolean {
        return this.isLoaded() && this.user !== null && Number.isFinite(this.user.id);
    }

    /**
     * Returns a boolean whether the user is loaded.
     */
    isLoaded(): boolean {
        return this._user !== null;
    }

    /**
     * Try to login with the given username and password.
     */
    login(username: string, password: string) {
        // TODO: We need to process the JWT and get the user data.
        return axios.post(loginUrl, {
            username,
            password,
        });
    }

    logout() {
        // TODO: remove jwt token.
        this._user = null;
    }

    refresh() {
        // TODO: implement the userdata reload.
    }
}

// Let's create the instance.
const auth = new Auth();

// Make the auth class reactive and add it to vue.
// We can call the auth with: $auth
const vm = new Vue({ data: { auth }});

// @ts-ignore
// Yes I know what I am doing...
Auth.install = function install($Vue: any) {
    Object.defineProperty($Vue.prototype, '$auth', { value: vm.auth });

    // TODO: add interceptors for as we recieve 401's or 403's.
}

export default Auth;
