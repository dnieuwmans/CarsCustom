<template>
    <div class="home">
        <header class="home-header">

            <div class="container">
                <div class="row">
                    <div class="col header-nav">
                        <div class="header-nav__logo logo logo--white">
                            <main-logo></main-logo>
                        </div>

                        <div class="header-nav__menu">
                            <ul class="list-unstyled">
                                <li class="active">
                                    <router-link :to="{name: 'home'}">Home</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'explore-cars'}">Explore Cars</router-link>
                                </li>
                                <li><a href="#"><i class="far fa-user"></i></a></li>
                                <li>
                                    <router-link :to="{name: 'order'}">
                                        <i class="fas fa-shopping-basket"></i>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col header-text">
                        <h1>Buy your dream car today!</h1>
                        <h4>Choose from {{ totalCars }} exclusive cars.</h4>
                        <p class="text-center">
                            <router-link class="btn btn-lg btn-outline" :to="{name: 'explore-cars'}">
                                <span>Explore</span>
                                <i class="far fa-map"></i>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>

        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MainLogo from "../../components/MainLogo.vue";
    import Api from '@/api/Api';

    @Component({
        components: {
            MainLogo
        }
    })
    export default class Home extends Vue {
        public totalCars: Number = 0;

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public mounted() {
            Api.car.countAll().then((response) => {
                this.totalCars = response.data;
            })
        }
    }
</script>
