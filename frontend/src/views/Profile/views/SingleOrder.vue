<template>
    <div>
        <router-link :to="{name: 'profile:orders'}">
            <i class="fal fa-chevron-left"></i>
            <span>Back to profile</span>
        </router-link>
        
        <div class="single-order mt-4" v-if="order != null">
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
                    <li>{{ order.selectedCar.brand }} {{ order.selectedCar.type }} - {{ order.selectedColorObject }}
                    </li>
                    <li>{{ order.selectedCar.description }}</li>
                    <li>{{ order.selectedCar.formattedPrice }}</li>
                    <li><hr /></li>
                    <li v-for="accessory in order.selectedAccessories">+ {{ accessory.description }} <small>({{ accessory.formattedCost}})</small></li>
                </ul>
            </div>

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
                            <td>{{ order.status.value }}</td>
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

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import MainNav from '@/components/MainNav.vue';

    import Api from '../../../api/Api';
    import {Order} from '../../../models/Order';
    import Car from '../../../models/Car';

    @Component({
        name: 'SingleOrder',
        components: {
            MainNav,
        }
    })
    export default class SingleOrder extends Vue {
        // @ts-ignore
        private order: Order = null;

        get image() {
            if ('selectedCar' in this.order) {
                // @ts-ignore
                return this.order.selectedCar.images[this.order.selectedColor];
            }

            return '';
        }

        public mounted() {
            const id = Number.parseInt(this.$route.params.id, 10);

            if (Number.isNaN(id)) {
                this.$router.push({name: 'profile:orders'});
                return;
            }

            Api.order.getOrderById(id).then((response) => {
                // TODO: fix this on backend, this is a bit dirty :P
                const orderData = response.data;

                orderData.car.colors = [orderData.selectedColor];
                orderData.selectedCar = new Car(orderData.car);
                orderData.selectedColor = 0;
                orderData.orderUser = orderData.user;

                this.order = Order.fromJson(orderData);
            })
        }
    }
</script>