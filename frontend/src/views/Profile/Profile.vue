<template>
    <div class="profile">
        <main-nav/>

        <div class="profile-wrapper">
            <div class="profile-info">
                <div class="profile-info-card">
                    <div class="profile-avatar">
                        <i class="fal fa-user"></i>
                        <h6>{{ $auth.user.fullName}}</h6>
                    </div>
                    <div class="user-info">
                        <ul>
                            <li>
                                <i class="fal fa-fw fa-id-card-alt" title="Username"></i>
                                <span>{{ $auth.user.username }}</span>
                            </li>
                            <li>
                                <i class="fal fa-fw fa-envelope" title="Email"></i>
                                <span>{{ $auth.user.email }}</span>
                            </li>
                            <li>
                                <i class="fal fa-fw fa-mobile-android" title="Phone"></i>
                                <span>{{ $auth.user.phone }}</span>
                            </li>
                            <li>
                                <i class="fal fa-fw fa-map-marker-alt" title="Address"></i>
                                <span>{{ $auth.user.address}}</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div class="profile-container box">
                <div class="profile-container__title">
                    <h3>My Profile</h3>
                    <h5>My Orders</h5>
                </div>
                <div class="profile-container__content">
                    <ul class="list-unstyled" v-if="orders.length > 0">
                        <li v-for="order in orders" class="order-item">
                            <span class="badge">{{ order.status.value }}</span>
                            <span class="badge">#{{ order.id }}</span>
                            <span class="order-price">{{ order.selectedCar.fullDescription }}</span>
                            <span>{{ order.totalPrice }}</span>
                            <span>
                                <router-link :to="{ name: 'order-complete', params: { token: order.token }} ">
                                    View Order
                                    <i class="fal fa-chevron-right"></i>
                                </router-link>
                            </span>
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
                this.$router.push({name: 'home'});
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