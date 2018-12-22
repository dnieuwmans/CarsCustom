<template>
    <div class="profile-container__content">
        <ul class="list-unstyled" v-if="orders.length > 0">
            <li v-for="order in orders" class="order-item">
                <span class="badge">{{ order.status.value }}</span>
                <span class="badge">#{{ order.id }}</span>
                <span class="order-price">{{ order.selectedCar.fullDescription }}</span>
                <span>{{ order.totalPrice }}</span>
                <span>
                    <router-link :to="{ name: 'profile:single-order', params: { id: order.id }} ">
                        View Order
                        <i class="fal fa-chevron-right"></i>
                    </router-link>
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import MainNav from '@/components/MainNav.vue';

    import Api from '../../../api/Api';
    import {Order} from '../../../models/Order';
    import Car from '../../../models/Car';

    @Component({
        name: 'ProfileOrders',
        components: {
            MainNav,
        }
    })
    export default class ProfileOrders extends Vue {
        public orders: Order[] = [];

        public mounted() {
            Api.order.getMyOrders().then((response) => {
                this.orders = response.data.map((order: any) => {
                    const orderData = order;

                    orderData.car.colors = [orderData.selectedColor];
                    orderData.selectedCar = new Car(orderData.car);
                    orderData.selectedColor = 0;
                    orderData.orderUser = orderData.user;

                    return Order.fromJson(orderData);
                });
            })
        }
    }
</script>