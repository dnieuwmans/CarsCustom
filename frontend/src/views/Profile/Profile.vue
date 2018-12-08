<template>
    <div class="profile">
        <main-nav/>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <h4>Welcome, {{ $auth.user.fullName }}</h4>
                    <table class="table user-summary-table">
                        <tr>
                            <th>Full name:</th>
                            <td>{{ $auth.user.fullName }}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{{ $auth.user.email }}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>{{ $auth.user.address }}</td>
                        </tr>
                        <tr>
                            <th>Phone:</th>
                            <td>{{ $auth.user.phone }}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6 offset-1">
                    <h5>My Orders</h5>
                    <ul class="my-orders">
                        <li v-for="order in orders" class="order-item box">
                            <router-link :to="{ name: 'order-complete', params: { token: order.token }} ">
                                #{{ order.id }} -
                                {{ order.selectedCar.fullDescription }}
                            </router-link>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from "../../components/MainNav";
    import Api from "../../api/Api";
    import {Order} from "../../models/Order";
    import Car from "../../models/Car";

    @Component({
        name: 'Profile',
        components: {
            MainNav,
        }
    })
    export default class Profile extends Vue {
        public orders: Order[] = [];

        public mounted() {
            // Extra check when you are not loggedIn
            if (this.$auth.user == null) {
                this.$router.push({ name: 'home' });
                return;
            }

            Api.order.getMyOrders().then((response) => {
                this.orders = response.data.map((order) => {
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