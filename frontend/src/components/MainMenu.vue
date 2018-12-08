<template>
    <div class="header-nav__menu">
        <ul class="list-unstyled">
            <!-- Computed routes -->
            <li class="nav-menu__item" :class="{'active': link.name === current}" v-for="link in links">
                <router-link :to="{name: link.name}">{{ link.text }}</router-link>
            </li>

            <!-- Shopping basket -->
            <li class="nav-menu__item" :class="{ 'has-order': order != null }">
                <router-link :to="{name: 'order'}">
                    <i class="fal fa-shopping-basket"></i>
                </router-link>
            </li>

            <li class="nav-menu__item">
                <a href="#" @click.stop.prevent="toggleLoginModal()">
                    <i class="fal fa-user" v-if="$auth.user == null"></i>
                    <i class="fas fa-user" v-else></i>
                </a>
            </li>
        </ul>

        <div class="account-dropdown" :class="{ 'is-visible' : loginModalVisible }" @click.stop>
            <div class="account-dropdown__no-account" v-if="$auth.user == null">
                <div class="row" v-if="loginMessage !== ''">
                    <div class="col">
                        <div class="alert alert-danger mb-4">
                            <i class="far fa-times"></i>
                            {{ loginMessage }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col input-container">
                        <i class="fal fa-user icon"></i>
                        <input type="text"
                               id="login-username"
                               class="form-control"
                               :class="{'is-invalid': loginValidation.hasError(fieldsEnum.USERNAME)}"
                               placeholder="John Doe"
                               v-model="loginData.username"
                        >
                        <div class="invalid-feedback"
                             v-text="loginValidation.errors[fieldsEnum.USERNAME]"
                             v-if="loginValidation.hasError(fieldsEnum.USERNAME)"
                        ></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col input-container">
                        <i class="fal fa-key icon"></i>
                        <input type="password"
                               id="login-password"
                               class="form-control"
                               :class="{'is-invalid': loginValidation.hasError(fieldsEnum.PASSWORD)}"
                               placeholder="••••••••"
                               v-model="loginData.password"
                               @keyup.enter="tryLogin"
                        >
                        <div class="invalid-feedback"
                             v-text="loginValidation.errors[fieldsEnum.PASSWORD]"
                             v-if="loginValidation.hasError(fieldsEnum.PASSWORD)"
                        ></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-primary btn-block" @click="tryLogin()">
                            Login
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center text-forgot-password">
                            <router-link :to="{name: 'register-user'}">
                                Forgot Password?
                            </router-link>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-lg-12 text-register">
                        <router-link :to="{name: 'register-user'}">
                            Don't have an account yet? Register here!
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="account-dropdown__account" v-else>
                <em>Hello, {{ $auth.user.fullName }}</em>
                <ul class="list-unstyled">
                    <li>
                        <router-link :to="{name: 'profile'}">
                            <i class="fal fa-user"></i>
                            <span>My Profile</span>
                        </router-link>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logout()">
                            <i class="fal fa-power-off"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Validation from "../utils/Validation";
    import {cloneDeep} from 'lodash';

    const enum fieldsEnum {
        USERNAME = 'username',
        PASSWORD = 'password',
    }

    @Component({
        name: 'MainMenu',
    })
    export default class MainMenu extends Vue {
        public current: string = '';
        public links: object[] = [
            {
                name: 'home',
                text: 'Home',
            },
            {
                name: 'explore-cars',
                text: 'Explore Cars',
            },
        ];
        public loginModalVisible: boolean = false;
        public fieldsEnum = fieldsEnum;
        public loginMessage = '';
        public loginValidation: Validation = new Validation({});
        public loginData: any = {
            username: '',
            password: '',
        };

        // TODO: remove
        public usernameLogin: string = '';
        public passwordLogin: string = '';

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public mounted() {
            this.current = this.$route.name || '';

            this.loginValidation = new Validation(cloneDeep(this.loginData));
        }

        public toggleLoginModal() {
            this.loginModalVisible = !this.loginModalVisible;

            if (!this.loginModalVisible) {
                document.removeEventListener('click', this.toggleLoginModal);
            } else {
                document.addEventListener('click', this.toggleLoginModal);
            }
        }

        public logout() {
            // TODO: make this better
            this.$auth.logout();

            // Refresh the page
            this.$router.push({ name: 'home' });
        }

        public tryLogin() {
            this.loginMessage = '';

            // Validate the fields
            this.loginValidation.notBlank(fieldsEnum.USERNAME, this.loginData[fieldsEnum.USERNAME]);
            this.loginValidation.notBlank(fieldsEnum.PASSWORD, this.loginData[fieldsEnum.PASSWORD]);

            if (!this.loginValidation.hasErrors()) {
                this.$auth.login(this.loginData.username, this.loginData.password).then(() => {
                    this.loginData = {username: '', password: ''};
                }).catch((error) => {
                    console.dir(error);
                    if (error.response.status === 401) {
                        this.loginMessage = 'Username and password is invalid.';
                    }
                });
            }
        }
    }
</script>