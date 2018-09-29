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
                <div class="col-lg-4 col-md-6 mb-4" v-for="car in cars" :key="car.id">
                    <car-card
                            :car="car"
                            @CarCard:Customize="customizeCar(car)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainLogo from '@/components/MainLogo.vue';
    import CarCard from '@/components/CarCard.vue';

    import Car from '@/models/Car';
    import CarApi from '@/api/CarApi';

    @Component({
        name: 'ExploreCars',
        components: {
            CarCard,
            MainLogo
        }
    })
    export default class ExploreCars extends Vue {
        public cars: Car[] = [];

        public customizeCar(car) {
            console.log(car);
        }

        public mounted() {
            CarApi.findAll().then((response) => {
                // TODO: map data
                this.cars = response.data;
            })

            this.$store.commit('Order/setSelectedCar', new Car({
                    id: 1,
                    brand: 'test',
                    color: ['#fff'],
                    price: 100,
                    type: 'something',
                }
            ));
        }
    }
</script>