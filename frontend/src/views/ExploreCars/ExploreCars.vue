<template>
    <div class="explore-cars">
        <main-nav/>

        <div class="explore-cars-container">
            <div class="explore-cars__sidebar">
                <div class="sidebar__title">
                    <h5>Filter</h5>
                    <p><em>You can filter the overview by defining the right price range and color.</em></p>
                </div>
                <div class="sidebar__filter">
                    <p><strong>Price:</strong></p>
                    <div class="car-price-filer">
                        <input type="text" class="form-control" v-model="priceFilter.min"
                               @keyup.enter="filterCars('priceRange', priceFilter)">
                        <div class="divider">-</div>
                        <input type="text" class="form-control" v-model="priceFilter.max"
                               @keyup.enter="filterCars('priceRange', priceFilter)">
                        <button class="btn btn-primary" @click="filterCars('priceRange', priceFilter)">
                            <i class="fal fa-chevron-double-right"></i>
                        </button>
                    </div>
                    <small><a href="#" @click.prevent="resetPriceRange()">Reset Price</a></small>
                </div>
                <div class="sidebar__filter">
                    <p><strong>Colors</strong></p>
                    <ul class="car-colors">
                        <li
                                v-for="(color, key) in availableColors"
                                :key="color.id"
                                :title="color.name"
                                :class="{'car-colors__item--active': color.name === carFilter.color}"
                                class="car-colors__item"
                                @click="filterCars('color', color.name)"
                        >
                            <span :style="{ background: color.hex }"></span>
                        </li>
                    </ul>
                    <small><a href="#" @click.prevent="filterCars('color', '')">Reset Color</a></small>
                </div>

            </div>
            <div class="explore-cars__main">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h3>Explore Cars</h3>

                            <div class="alert alert-danger mb-4" v-if="showErrorMessage">
                                <i class="far fa-times"></i>
                                Oops, you didn't select a car yet!
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="filteredCars.length > 0">
                        <div class="col-lg-4 col-md-6 explore-cars-spacing" v-for="car in filteredCars" :key="car.id">
                            <car-card
                                    :car="car"
                                    @CarCard:Customize="customizeCar"
                            />
                        </div>
                    </div>
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
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary" @click="continueOrderModalPositive()">
                            <span>Start a new order</span>
                            <i class="fal fa-redo"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" @click="continueOrderModalNegative()">
                            <span>Continue with order</span>
                            <i class="fal fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </main-modal>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';
    import CarCard from '../../components/CarCard.vue';
    import {cloneDeep, uniqBy} from 'lodash';
    import Car from '../../models/Car';
    import {Order, stepsEnum} from '../../models/Order';
    import Api from '@/api/Api';
    import MainModal from "../../components/MainModal.vue";
    import MainFooter from "../../components/MainFooter";

    @Component({
        name: 'ExploreCars',
        components: {
            MainFooter,
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
        public priceFilter: any = {min: 0, max: 0}; // used to pass the values to the filter
        public carFilter: any = {
            priceRange: {
                min: '',
                max: '',
            },
            color: '',
        };

        get availableColors() {
            let colors = [];

            this.cars.forEach((car) => {
                colors.push(...car.colors);
            });

            return uniqBy(colors, 'name');
        }

        get prices() {
            const prices = this.cars.slice(0).map(car => car.price);

            return {
                min: Math.min(...prices),
                max: Math.max(...prices),
            };
        }

        get filteredCars() {
            // First get a copy of the cars array
            let filteredCars = this.cars.slice(0);

            // filter on the price
            if (this.carFilter.priceRange.min !== '' || this.carFilter.priceRange.max !== '') {
                filteredCars = filteredCars.filter((car) => {
                    // Filter on min and max
                    if (this.carFilter.priceRange.min !== '' && this.carFilter.priceRange.max !== '') {
                        return car.price <= this.carFilter.priceRange.max && car.price >= this.carFilter.priceRange.min;
                    }

                    if (this.carFilter.priceRange.min !== '') {
                        return car.price >= this.carFilter.priceRange.min;
                    }

                    if (this.carFilter.priceRange.max !== '') {
                        return car.price <= this.carFilter.priceRange.max;
                    }

                    return true;
                })
            }

            // Filter on color
            if (this.carFilter.color !== '') {
                filteredCars = filteredCars.filter((car) => {
                    const found = car.colors.find((color) => {
                        return color.name === this.carFilter.color;
                    });

                    return found != null;
                })
            }

            return filteredCars;
        }

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

            Api.car.findAll().then((response) => {
                // TODO: map data
                this.cars = response.data.map(Car.fromJson);

                // Clone it, otherwise it will change
                this.priceFilter = cloneDeep(this.prices);
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
                selectedAccessories: [],
            });

            this.$store.commit('Order/setOrder', order);
        }

        public filterCars(key, value) {
            this.carFilter[key] = cloneDeep(value);
        }

        public resetPriceRange() {
            this.filterCars('priceRange', this.prices);

            // Clone it, otherwise it will change
            this.priceFilter = cloneDeep(this.prices);
        }
    }
</script>