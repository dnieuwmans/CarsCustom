<template>
    <div>
        <nav class="main-nav">
            <div class="container">
                <div class="row">
                    <div class="col logo logo--white logo--smaller">
                        <main-logo />
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
                <div class="col-md-4" v-for="car in cars" :key="car.id">
                    <div class="box car-card">
                        <div class="car-card__header">
                            <figure>
                                <img src="https://via.placeholder.com/400x400/" class="img-fluid" alt="">
                            </figure>
                        </div>
                        <div class="car-card__body">
                            <div class="car-card__body-top">
                                <span class="car-price">€100,-</span>
                                <ul class="car-colors">
                                    <li v-for="color in car.colors" :key="color" class="car-colors__item">
                                        <span :style="{ background: color }"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {{ car.name }}
                        <!--{{ car.description }}-->
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