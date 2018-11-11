<template>
    <div class="order-complete">
        <main-nav/>

        <div class="container">
            <div class="row">
                <div class="col">
                    <h3 class="text-center">
                        <i class="fal fa-shopping-cart"></i> <br>
                        Your order is complete and will be prepared!
                    </h3>
                    <h6 class="text-center">Thanks for placing your order, you can track your order right here!</h6>
                </div>
            </div>

            <div class="row" v-if="order">
                <div class="col">
                    <div class="box order-complete-box">
                        <div class="order-info">
                            <div class="table-wrapper">
                                <table class="table">
                                    <tr>
                                        <th>Order Number:</th>
                                        <td>#{{ order.id }}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Price:</th>
                                        <td>{{ order.totalPrice }}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Status:</th>
                                        <td>{{ order.status }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <th>Fullname:</th>
                                        <td>{{ order.orderUser.fullName }}</td>
                                    </tr>
                                    <tr>
                                        <th>Address:</th>
                                        <td>{{ order.orderUser.address }}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{{ order.orderUser.email }}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone:</th>
                                        <td>{{ order.orderUser.phone }}</td>
                                    </tr>
                                </table>
                            </div>

                            <small>
                                <em>Did we get invalid information? Let us know! <a href="#">Contact us</a>.</em>
                            </small>
                        </div>

                        <div class="order-item">
                            <figure>
                                <transition name="slide-fade" mode="out-in">
                                    <img :src="`img/${image}`"
                                            alt=""
                                            v-for="(image, key) in order.selectedCar.images"
                                            :key="key"
                                            v-if="key === order.selectedColor"
                                    />
                                </transition>
                            </figure>
                            <ul class="list-unstyled">
                                <li>{{ order.selectedCar.brand }} {{ order.selectedCar.type }} - {{ order.selectedColorObject }}</li>
                                <li>{{ order.selectedCar.description }}</li>
                                <li>{{ order.selectedCar.formattedPrice }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
        
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';
    import Api from '@/api/Api';
    import { Order } from '@/models/Order';
    import Car from '@/models/Car';

    @Component({
        name: 'OrderComplete',
        components: {
            MainNav,
        }
    })
    export default class OrderComplete extends Vue {
        // @ts-ignore
        private order: Order = null;

        beforeCreate() {
            const token = this.$route.params.token;
            
            // TODO: maybe a 404?!
            // We can't show anything if we don't have the token.
            if(!token) {
                this.$router.push({ name: 'home'});
                return;
            }

            // Get the data from the order by its token.
            Api.order.getOrderByToken(token).then((response) => {
                if (response.status === 204) {
                    this.$router.push({ name: 'home'});
                    return;
                }

                // TODO: fix this on backend, this is a bit dirty :P
                const orderData = response.data;

                orderData.car.colors = [orderData.selectedColor];
                orderData.selectedCar = new Car(orderData.car);
                orderData.selectedColor = 0;
                orderData.orderUser = orderData.user;

                this.order = Order.fromJson(orderData);
            });
            
        }

        get image() {
            if ('selectedCar' in this.order) {
                // @ts-ignore
                return this.order.selectedCar.images[this.order.selectedColor];
            }

            return '';
        }
    }
</script>
