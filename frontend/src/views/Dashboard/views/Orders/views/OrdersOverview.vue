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
                    <td><div class="badge badge-primary" v-text="order.status.value"></div></td>
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
                                    :class="{'car-colors__item--active': key === selectedColor}"
                                    class="car-colors__item"
                            >
                                <span :style="{ background: color.hex }"></span>
                            </li>
                        </ul>
                    </td>
                    <td v-text="order.totalPrice"></td>
                    <td class="actions">
                        <a href="#"><i class="far fa-ellipsis-h"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/api/Api";
import Car from "@/models/Car";
import { Order } from "@/models/Order";
import { formatDate } from '@/utils/Date';

@Component({})
export default class DashboardOrdersOverview extends Vue {
  public orders: Order[] = [];
    public formatDate = formatDate;

  mounted() {
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

    
  }
}
</script>

