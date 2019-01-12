<template>
    <div>
        <h5>Overview</h5>

        <table class="table dashboard-table">
            <thead>
            <tr>
                <th>Nr</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Selected Car</th>
                <th>Color</th>
                <th>Total Price</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" :key="order.id">
                <td v-text="`#${order.id}`"></td>
                <td>
                    <div class="badge badge-primary" v-text="order.status.value"></div>
                </td>
                <td v-text="formatDate(order.createdAt, '%d %M %Y - %H:%i')"></td>
                <td><a :href="`mailto: ${order.orderUser.email}`">{{ order.orderUser.fullName }}</a></td>
                <td v-text="order.orderUser.address"></td>
                <td v-text="order.selectedCar.fullDescription"></td>
                <td>
                    <ul class="car-colors">
                        <li
                                v-for="(color, key) in order.selectedCar.colors"
                                :key="color.id"
                                :title="color.name"
                                class="car-colors__item"
                        >
                            <span :style="{ background: color.hex }"></span>
                        </li>
                    </ul>
                </td>
                <td v-text="order.totalPrice"></td>
                <td class="actions">
                    <row-action>
                        <ul slot="content">
                            <li>
                                <a href="#" @click.prevent="openChangeStatusModal(order)">
                                    <i class="fal fa-fw fa-pen"></i>
                                    <span>Update Status</span>
                                </a>
                            </li>
                        </ul>
                    </row-action>
                </td>
            </tr>
            </tbody>
        </table>

        <transition name="modal">
            <main-modal v-if="changeStatusModalOpen">
                <h5 slot="header">Change the order status</h5>
                <div slot="body">
                    <p>You are about to change the order status of: #{{ selectedOrder.id }}</p>
                    <div class="form-group">
                        <select class="form-control" v-model="selectedOrder.status" id="role">
                            <option v-for="status in statuses" :key="status.key" :value="status">{{ status.value }}</option>
                        </select>
                    </div>
                </div>
                <div slot="footer">
                    <div class="btn-group">
                        <button type="button" class="btn btn-secondary" @click="changeStatusModalOpen = false">
                            <i class="fal fa-chevron-left"></i>
                            <span>Back</span>
                        </button>
                        <button type="button" class="btn btn-primary" @click="changeStatus()">
                            <span>Save</span>
                            <i class="fal fa-check"></i>
                        </button>
                    </div>
                </div>
            </main-modal>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import { cloneDeep } from 'lodash';
    import Api from "@/api/Api";
    import Car from "@/models/Car";
    import {Order} from "@/models/Order";
    import {formatDate} from '@/utils/Date';
    import RowAction from "../../../components/RowAction.vue";
    import MainModal from "../../../../../components/MainModal.vue";
    import OrderStatus from "../../../../../models/OrderStatus";

    @Component({
        components: {MainModal, RowAction}
    })
    export default class DashboardOrdersOverview extends Vue {
        public orders: Order[] = [];
        public formatDate = formatDate;
        public changeStatusModalOpen: boolean = false;
        public selectedOrder: Order | null = null;
        public statuses: OrderStatus[] = [];

        mounted() {
            // These Api calls can run parallel.
            Api.order.getOrders().then(response => {
                this.orders = response.data.map((order: any) => {
                    // Make sure to get the right mapping.
                    order.car.colors = [order.selectedColor];
                    order.selectedCar = new Car(order.car);
                    order.selectedColor = 0;
                    order.orderUser = order.user;

                    return Order.fromJson(order);
                });
            });

            Api.orderStatuses.getStatuses().then((response) => {
                this.statuses = response.data.map(OrderStatus.fromJson);
            })
        }

        public openChangeStatusModal(order: Order) {
            this.changeStatusModalOpen = !this.changeStatusModalOpen;
            this.selectedOrder = cloneDeep(order);
        }

        public changeStatus() {
            if (this.selectedOrder == null) {
                return;
            }

            Api.order.updateOrderStatus(this.selectedOrder.toJson(true)).then((response) => {
                console.log(response);

                const status = OrderStatus.fromJson(response.data.status);

                this.orders = this.orders.map((order: Order) => {
                    if (order.id === response.data.id) {
                        order.status = status;
                    }

                    return order;
                });

                this.changeStatusModalOpen = false;
            })
        }
    }
</script>

