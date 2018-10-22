<template>
    <div class="explore-cars">
        <main-nav/>

        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Explore Cars</h3>

                    <div class="alert alert-danger mb-4" v-if="showErrorMessage">Oops, you didn't select a car yet!
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 explore-cars-spacing" v-for="car in cars" :key="car.id">
                    <car-card
                            :car="car"
                            @CarCard:Customize="customizeCar"
                    />
                </div>
            </div>
        </div>

        <transition name="modal">
            <main-modal v-if="continueOrderModal">
                <h5 slot="header">You are about to change the order</h5>
                <p slot="body">
                    You are about to change the order, this action will overwrite the existing order.
                </p>
                <div slot="footer">
                    <button type="button" class="btn btn-primary" @click="continueOrderModalPositive()">
                        Start a new order
                    </button>
                    <button type="button" class="btn btn-secondary" @click="continueOrderModalNegative()">
                        Continue with order
                    </button>
                </div>
            </main-modal>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';
    import CarCard from '../../components/CarCard.vue';

    import Car from '../../models/Car';
    import {Order, stepsEnum} from '../../models/Order';
    import CarApi from '../../api/CarApi';
    import MainModal from "../../components/MainModal.vue";

    @Component({
        name: 'ExploreCars',
        components: {
            MainModal,
            CarCard,
            MainNav,
        }
    })
    export default class ExploreCars extends Vue {
        public cars: Car[] = [];
        public showErrorMessage: boolean = false;
        public continueOrderModal: boolean = false;
        public carsSpecifications: any = [];

        public customizeCar(car: Car, color: string) {
            // So we can use it at different places
            this.carsSpecifications = [car, color];

            const storedOrder = this.$store.getters['Order/getOrder'];

            if (storedOrder != null) {
                this.continueOrderModal = true;
            } else {
                // All is okay, let's start a new order
                this.setOrder();
                this.$router.push({name: 'order'});
            }
        }

        public mounted() {
            this.showErrorMessage = !!parseInt(this.$route.query.state) || false;

            CarApi.findAll().then((response) => {
                // TODO: map data
                this.cars = response.data.map(Car.fromJson);
            });
        }

        public continueOrderModalNegative() {
            // Now hide the modal again
            this.continueOrderModal = false;
            document.body.className = '';

            this.$router.push({name: 'order'});
        }

        public continueOrderModalPositive() {
            this.setOrder();
            this.continueOrderModalNegative();
        }

        // Let's set the order
        private setOrder() {
            const order = new Order({
                id: 0,
                selectedCar: this.carsSpecifications[0],
                selectedColor: this.carsSpecifications[1],
                activeStep: stepsEnum.COLOR,
            });

            this.$store.commit('Order/setOrder', order);
        }
    }
</script>