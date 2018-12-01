<template>
    <div class="order-panel col">
        <h4>Summary</h4>
        <p>Hold on tight, {{ order.orderUser.firstName}}. We are almost there. Please verify
            your order on the left and the user information before continue.</p>


        <h5 class="mb-4">User Information</h5>
        <table class="order-summary-table">
            <tr>
                <th>Full name:</th>
                <td>{{ order.orderUser.fullName }}</td>
            </tr>
            <tr>
                <th>Email:</th>
                <td>{{ order.orderUser.email }}</td>
            </tr>
            <tr>
                <th>Address:</th>
                <td>{{ order.orderUser.address }}</td>
            </tr>
            <tr>
                <th>Phone:</th>
                <td>{{ order.orderUser.phone }}</td>
            </tr>
        </table>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'SummaryStep',
    })
    export default class SummaryStep extends Vue {
        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public selectColor(key: number) {
            this.$store.commit('Order/setSelectedColor', key);
        }
    }
</script>