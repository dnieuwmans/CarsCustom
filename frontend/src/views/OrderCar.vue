<template>
    <div class="order-car">
        <main-nav/>

        <header class="order-car-header" v-if="order != null">
            <div class="container">
                <ul class="order-steps">
                    <li v-for="(step, key) in steps" :class="{'is-active': (key + 1) === activeStep, 'is-completed': step.completed === 100 }">
                        <span class="order-steps__indicator" v-text="step.id"></span>
                        <span class="order-steps__info" v-text="step.name"></span>

                        <div class="order-steps__progress" :style="{'width': `calc(${step.completed}% - 3rem)`}"></div>
                    </li>
                </ul>
            </div>

            <div class="order-detail" v-if="order.selectedCar != null">
                <div class="order-detail__info">
                    <h2>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</h2>
                    <h4>{{ order.selectedCar.description }}</h4>
                </div>
                <figure class="order-detail__image">
                    <img :src="`img/${image}`" alt="">
                </figure>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '@/components/MainNav.vue';
    import Order from '@/models/Order';
    import Car from '@/models/Car';

    const namespace: string = 'Order';

    enum steps {
        COLOR = 1,
        ACCESSORY,
        SUMMARY,
    }

    @Component({
        name: 'OrderCar',
        components: {
            MainNav,
        }
    })
    export default class OrderCar extends Vue {
        public steps: object[] = [
            {
                id: steps.COLOR,
                name: 'Color',
                completed: 100,
            },
            {
                id: steps.ACCESSORY,
                name: 'Accessory',
                completed: 0,
            },
            {
                id: steps.SUMMARY,
                name: 'Summary',
                completed: 0,
            }
        ];

        public activeStep: number = steps.COLOR;

        public order: Order | any = {};

        get selectedColor() {
            return this.$store.getters['Order/getSelectedColor'];
        }

        get selectedCar() {
            return this.$store.getters['Order/getSelectedCar'];
        }

        get image() {
            if ('selectedCar' in this.order) {
                return this.order.selectedCar.images[this.order.selectedColor];
            }

            return '';
        }

        public mounted() {
            // TODO: check if we got an order stored.
            let storedOrder: any = null; // TODO: Should we add an interface for order?
            if (localStorage.getItem('order') != null) {
                // Yes I know what I am doing!
                // @ts-ignore-line
                storedOrder = JSON.parse(localStorage.getItem('order'));
            }

            // Check if we got a car selected
            if (this.selectedCar == null && storedOrder == null) {
                this.$router.push({name: 'explore-cars', query: {state: '1'}});
                return;
            }

            // Store the order in localStorage
            if (localStorage.getItem('order') == null) {
                // Creates the order instance
                this.order = new Order({
                    id: 0,
                    selectedCar: this.selectedCar,
                    selectedColor: this.selectedColor,
                });
            } else {
                // Let's restore it! make sure to map the objects again
                storedOrder.selectedCar = Car.fromJson(storedOrder.selectedCar);
                this.order = new Order(storedOrder);
            }
        }
    }
</script>