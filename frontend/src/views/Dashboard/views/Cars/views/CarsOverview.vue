<template>
    <div>
        <h5>Overview</h5>

        <table class="table dashboard-table">
            <thead>
            <tr>
                <th>Nr</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Colors</th>
                <th>Accessories</th>
                <th>Active</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="car in cars" :key="car.id" :class="{ 'item-disabled' : car.disabled }">
                <td>#{{ car.id }}</td>
                <td>{{ car.brand }}</td>
                <td>{{ car.type }}</td>
                <td>{{ car.description }}</td>
                <td>{{ car.formattedPrice }}</td>
                <td>{{ car.colors.length }}</td>
                <td>{{ car.accessories.length }}</td>
                <td>
                    <i v-if="car.disabled" class="fal fa-times"></i>
                    <i v-else class="fal fa-check"></i>
                </td>
                <td class="actions">
                    <row-action>
                        <ul slot="content">
                            <li>
                                <a href="#">
                                    <i class="fal fa-fw" :class="car.disabled ? 'fa-check' : 'fa-times'"></i>
                                    <span v-text="car.disabled ? 'Enable' : 'Disable'"></span>
                                </a>
                            </li>
                        </ul>
                    </row-action>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import Api from "../../../../../api/Api";
    import Car from "@/models/Car";
    import RowAction from "../../../components/RowAction.vue";

    @Component({
        components: {RowAction}
    })
    export default class DashboardOrdersOverview extends Vue {
        public cars: Car[] = [];

        mounted() {
            Api.car.findAll(true).then(response => {
                this.cars = response.data.map(Car.fromJson);
            });


        }
    }
</script>
