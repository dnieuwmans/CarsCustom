<template>
    <div>
        <nav></nav>

        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="car in cars" :key="car.id">
                    <div class="box car-card">
                        <div class="car-card__header">
                            <figure>
                                <img src="https://via.placeholder.com/400x400/" class="img-fluid" alt="">
                            </figure>
                        </div>
                        <ul class="car-info">
                            <li class="car-color" v-for="color in cars.colors" :key="color"></li>
                        </ul>
                        {{ car.id }}
                        {{ car.name }}
                        {{ car.description }}
                        {{ car.colors }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Car from '@/models/Car';
    import CarApi from '@/api/CarApi';

    @Component({
        name: 'ExploreCars',
        components: {}
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