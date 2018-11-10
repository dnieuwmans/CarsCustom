<template>
    <div>
        Order is complete, yay!
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Api from '@/api/Api';
    import { Order } from '@/models/Order';

    @Component({
        name: 'OrderComplete',
    })
    export default class OrderComplete extends Vue {
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

                // TODO: fix this on backend
                const orderData = response.data;
                orderData.selectedCar = orderData.car;
                orderData.orderUser = orderData.user;

                this.order = Order.fromJson(orderData);
            });
            
        }
    }
</script>
