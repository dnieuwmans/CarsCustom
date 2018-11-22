<template>
    <nav class="main-nav">
        <div class="container-fluid">
            <div class="row">
                <div class="col logo logo--white logo--smaller">
                    <main-logo/>
                </div>

                <div class="header-nav__menu">
                    <ul class="list-unstyled">
                        <li :class="{'active': link.name === current}" v-for="link in links">
                            <router-link :to="{name: link.name}">{{ link.text }}</router-link>
                        </li>

                        <li class="login" :class="{ 'active': loginModalVisible }" @click="toggleLoginModal">
                            <a class="login-trigger" href="#">
                                <i class="far fa-user"></i>
                            </a>
                            <div class="login-content" :class="{ 'is-visible': loginModalVisible }" @click.stop>
                                <li>
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
                                            <button class="btn btn-primary btn-block" @click="tryLogin">
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
                                </li>
                            </div>                     
                        </li>
                        <li>
                            <router-link :to="{name: 'order'}">
                                <i class="fal fa-shopping-basket"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MainLogo from '@/components/MainLogo.vue';

    @Component({
        name: 'MainNav',
        components: {
            MainLogo,
        }
    })
    export default class MainNav extends Vue {
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

        public tryLogin() {
            // TODO: validate shit

            this.$auth.login(this.usernameLogin, this.passwordLogin).then((response) => {
                console.log("login response: ", response);
                this.loginModalVisible = false;

                window.alert("Welkom!");
            })
        }
    }
</script>