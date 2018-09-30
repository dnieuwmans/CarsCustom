<template>
    <div>
        <main-nav />

        <ul>
            <li v-for="(step, key) in steps" :class="{'active': key === activeStep }">
                {{ step.id }}{{ step.name }}
            </li>
        </ul>

        <div v-if="order != null">
            <h2>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</h2>
            <h4>{{ order.selectedCar.description }}</h4>
            <figure>
                <img :src="`img/${order.selectedCar.image}`" alt="">
            </figure>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '@/components/MainNav.vue';
    import Order from '@/models/Order';

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

        public order: Order | null = null;

        get selectedCar() {
            return this.$store.getters['Order/getSelectedCar'];
        }

        public mounted() {
            // Check if we got a car selected
            if (this.selectedCar == null) {
                this.$router.push({name: 'explore-cars', query: {state: '1'}})
            }

            // Creates the order instance
            this.order = new Order({
                id: 0,
                selectedCar: this.selectedCar,
                selectedColor: '',
            });
        }
    }
</script>