<template>
    <div class="explore-cars">
        <main-nav />

        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Explore Cars</h3>

                    <div class="alert alert-danger mb-4" v-if="showErrorMessage">Oops, you didn't select a car yet!</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4" v-for="car in cars" :key="car.id">
                    <car-card
                            :car="car"
                            @CarCard:Customize="customizeCar"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '@/components/MainNav.vue';
    import CarCard from '@/components/CarCard.vue';

    import Car from '@/models/Car';
    import CarApi from '@/api/CarApi';

    @Component({
        name: 'ExploreCars',
        components: {
            CarCard,
            MainNav,
        }
    })
    export default class ExploreCars extends Vue {
        public cars: Car[] = [];
        public showErrorMessage: boolean = false;

        public customizeCar(car: Car, color: string) {
            this.$store.commit('Order/setSelectedCar', car);
            this.$store.commit('Order/setSelectedColor', color);
            this.$router.push({name: 'order'});
        }

        public mounted() {
            this.showErrorMessage = !!parseInt(this.$route.query.state) || false;

            CarApi.findAll().then((response) => {
                // TODO: map data
                this.cars = response.data.map(Car.fromJson);
            });
        }
    }
</script>