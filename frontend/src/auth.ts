import User from '@/models/User';
import axios, { AxiosPromise } from 'axios';
import Vue from 'vue';
import Api from './api/Api';
import { roleEnum } from './utils/Roles';

interface IAuth {
    isAuthenticated() : boolean;
    isLoaded() : boolean;
    login(username: string, password: string) : Promise<void>;
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
     * Not sure if we need this.
     */
    isAuthenticated(): boolean {
        return this.isLoaded() && this.user !== null && Number.isFinite(this.user.id);
    }

    isAdmin(): boolean {
        if (this._user == null) return false;

        return this.isLoaded() && this._user.role === roleEnum.ADMIN;
    }

    isEmployee(): boolean {
        if (this._user == null) return false;

        return this.isLoaded() && this._user.role === roleEnum.EMPLOYEE;
    }

    isCustomer(): boolean {
        if (this._user == null) return false;

        return this.isLoaded() && this._user.role === roleEnum.CUSTOMER;
    }

    hasRole(roles: number[]) {
        if (this._user == null) return false;

        return roles.includes(this._user.role);
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
        return Api.auth.login(username, password).then((response) =>  {
            // Sets the token in the local storage so we can keep the user loggedin even after a page refresh.
            localStorage.setItem('token', response.data.token);
            Api.setDefaultHeader('Authorization', 'Bearer ' + response.data.token);

            this.refresh();
        });
    }

    logout() {
        // Removes the user and token.
        this._user = null;
        localStorage.removeItem('token');
    }

    refresh() {
        // TODO: place in the api service
        return axios.get('http://localhost:5000/api/auth/logged-in').then((response) => {
            this._user = User.fromJson(response.data);

            // TODO: check if the user is enabled.

            return this._user;
        }).catch((error) => {
            if (error.response.status === 401) {
                this.logout();
            }
        })
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
};

export default Auth;
