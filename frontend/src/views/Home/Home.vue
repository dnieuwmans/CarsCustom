<template>
    <div class="home">
        <header class="home-header">

            <div class="container-fluid">
                <div class="row">
                    <div class="col header-nav">
                        <div class="header-nav__logo logo logo--white">
                            <main-logo></main-logo>
                        </div>

                        <main-menu/>
                    </div>
                </div>

                <div class="row">
                    <div class="col header-text">
                        <h1>Buy your dream car today!</h1>
                        <h4>Choose from {{ totalCars }} exclusive cars.</h4>
                        <p class="text-center">
                            <router-link class="btn btn-lg btn-outline" :to="{name: 'explore-cars'}">
                                <span>Explore</span>
                                <i class="fal fa-map"></i>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>

        </header>

        <section class="highlighted-car" v-if="highlightedCar != null">
            <h2>Car Of The Month</h2>
            <h4>{{ highlightedCar.fullDescription }}</h4>
            <figure>
                <img :src="`img/${highlightedCarImage}`"
                     class="img-fluid"
                     :alt="highlightedCar.fullDescription"
                />
            </figure>
            <p>This speed demon is the newest addition in our collection. This car will go from 0 to 100 within 4
                seconds! <br>Order this beast today and conquer the streets.</p>
            <p class="order-btn">
                <a @click.prevent="customizeCar(highlightedCar, 1)" class="btn btn-lg btn-outline">
                    <span>Order Now</span>
                    <i class="fal fa-chevron-right"></i>
                </a>
            </p>
        </section>

        <main-footer />

        <transition name="modal">
            <main-modal v-if="continueOrderModal">
                <h5 slot="header">You are about to change the order</h5>
                <p slot="body">
                    You are about to change the order, this action will overwrite the existing order.
                </p>
                <div slot="footer">
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary" @click="continueOrderModalPositive()">
                            <span>New Order</span>
                            <i class="fal fa-plus"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" @click="continueOrderModalNegative()">
                            <span>Continue</span>
                            <i class="fal fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </main-modal>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Api from '../../api/Api';
    import Car from "../../models/Car";
    import {Order, stepsEnum} from '../../models/Order';

    import MainLogo from "@/components/MainLogo.vue";
    import MainFooter from "@/components/MainFooter.vue";
    import MainMenu from "@/components/MainMenu.vue";
    import MainModal from "@/components/MainModal.vue";

    @Component({
        components: {
            MainFooter,
            MainMenu,
            MainLogo,
            MainModal,
        }
    })
    export default class Home extends Vue {
        public totalCars: Number = 0;
        public highlightedCar: Car | null = null;
        public carsSpecifications: any = [];
        public continueOrderModal: boolean = false;

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        get highlightedCarImage() {
            if (this.highlightedCar == null) {
                return '';
            }

            return this.highlightedCar.images[1];
        }

        public mounted() {
            Api.car.countAll().then((response) => {
                this.totalCars = response.data;
            });

            Api.car.findOneById(3).then((response) => {
                this.highlightedCar = Car.fromJson(response.data);
            })
        }

        public customizeCar(car: Car, color: number) {
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
                selectedAccessories: [],
            });

            this.$store.commit('Order/setOrder', order);
        }
    }
</script>
