<template>
    <div class="header-nav__menu">
        <ul class="list-unstyled">
            <!-- Computed routes -->
            <li class="nav-menu__item" :class="{'active': link.name === current}" v-for="link in links">
                <router-link :to="{name: link.name}">{{ link.text }}</router-link>
            </li>

            <!-- Shopping basket -->
            <li class="nav-menu__item">
                <router-link :to="{name: 'order'}">
                    <i class="fal fa-shopping-basket"></i>
                </router-link>
            </li>

            <li class="nav-menu__item">
                <a href="#" @click.prevent="toggleLoginModal()">
                    <i class="fal fa-user"></i>
                </a>
            </li>
        </ul>

        <div class="account-dropdown" :class="{ 'is-visible' : loginModalVisible }">
            <div class="account-dropdown__no-account" v-if="$auth.user == null">
                <div class="row">
                    <div class="col input-container">
                        <i class="fal fa-user icon"></i>
                        <input type="text"
                               id="usernameLogin"
                               class="form-control"
                               placeholder="username"
                               v-model="usernameLogin"
                        >
                    </div>
                </div>
                <div class="row">
                    <div class="col input-container">
                        <i class="fal fa-key icon"></i>
                        <input type="password"
                               id="passwordLogin"
                               class="form-control"
                               placeholder="Password"
                               v-model="passwordLogin"
                               @keyup.enter="tryLogin"
                        >
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
                <hr />
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
                        <a href="#">
                            <i class="fal fa-user"></i>
                            <span>My Profile</span>
                        </a>
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
        public usernameLogin: string = '';
        public passwordLogin: string = '';

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public mounted() {
            this.current = this.$route.name || '';
        }

        public toggleLoginModal() {
            this.loginModalVisible = !this.loginModalVisible;
        }

        public logout() {
            // TODO: make this better
            this.$auth.logout();

            // Refresh the page
            this.$router.go(0);
        }

        public tryLogin() {
            // TODO: validate shit
            this.$auth.login(this.usernameLogin, this.passwordLogin).then(() => {
                this.usernameLogin = '';
                this.passwordLogin = '';
            });
        }
    }
</script>