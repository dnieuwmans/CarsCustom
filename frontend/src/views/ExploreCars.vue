<template>
    <div class="explore-cars">
        <nav class="main-nav">
            <div class="container">
                <div class="row">
                    <div class="col logo logo--white logo--smaller">
                        <main-logo />
                    </div>

                    <div class="header-nav__menu">
                        <ul class="list-unstyled">
                            <li>
                                <router-link :to="{name: 'home'}">Home</router-link>
                            </li>
                            <li class="active">
                                <router-link :to="{name: 'explore-cars'}">Explore Cars</router-link>
                            </li>
                            <li><a href="#"><i class="far fa-user"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Explore Cars</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 card-padding" v-for="car in cars" :key="car.id">
                    <div class="box car-card">
                        <div class="car-card__header">
                            <figure>
                                <img :src="`img/${car.image}`" class="img-fluid" alt="">
                            </figure>
                        </div>
                        <div class="car-card__body">
                            <div class="car-card__body-top">
                                
                                <span class="car-price">€{{ car.price }},-</span>
                                <ul class="car-colors">
                                    <li v-for="color in car.colors" :key="color" class="car-colors__item">
                                        <span :style="{ background: color }"></span>
                                    </li>
                                </ul>
                            </div>

                            <div class="car-card__body-middle">
                                <span class="car-brand">{{ car.brand }} {{ car.type }}</span>
                                <span class="car-description">{{ car.description }}</span>
                            </div>

                            <div class="car-card__body-footer">
                                <button class="btn btn-primary">
                                    <span>Customize</span>
                                    <i class="fas fa-wrench"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainLogo from "@/components/MainLogo.vue";
    import Car from '@/models/Car';
    import CarApi from '@/api/CarApi';

    @Component({
        name: 'ExploreCars',
        components: {
            MainLogo
        }
    })
    export default class ExploreCars extends Vue {
        public cars: Car[] = [];

        public mounted() {
            CarApi.findAll().then((response) => {
                // TODO: map data
                this.cars = response.data;
            })
        }
    }
</script>