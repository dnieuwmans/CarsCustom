<template>
    <div class="order-car">
        <main-nav />

        <!--<ul>
            <li v-for="(step, key) in steps" :class="{'active': key === activeStep }">
                {{ step.id }}{{ step.name }}
            </li>
        </ul>

        <div v-if="order != null">
            <h2>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</h2>
            <h4>{{ order.selectedCar.description }}</h4>
            <figure>
                <img :src="`img/${image}`" alt="">
            </figure>
        </div>-->

        <header class="order-car-header" v-if="order != null">
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

    @Component({
        name: 'OrderCar',
        components: {
            MainNav,
        }
    })
    export default class OrderCar extends Vue {
        public steps: object[] = [
            {
                id: 1,
                name: 'Color',
            },
            {
                id: 2,
                name: 'Summary'
            }
        ];

        public activeStep: number = 0;

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
            // TODO: make an util who will watch for changes, maybe in the order model
            if (localStorage.getItem('order') == null) {
                // Creates the order instance
                this.order = new Order({
                    id: 0,
                    selectedCar: this.selectedCar,
                    selectedColor: this.selectedColor,
                });


                localStorage.setItem('order', JSON.stringify(this.order));
            } else {
                // Let's restore it! make sure to map the objects again
                this.order = storedOrder;
                this.order.selectedCar = Car.fromJson(storedOrder.selectedCar);
            }

        }
    }
</script>