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
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="car in cars" :key="car.id">
                <td>#{{ car.id }}</td>
                <td>{{ car.brand }}</td>
                <td>{{ car.type }}</td>
                <td>{{ car.description }}</td>
                <td>{{ car.formattedPrice }}</td>
                <td>{{ car.colors.length }}</td>
                <td>{{ car.accessories.length }}</td>
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
    import Api from "../../../../../api/Api";
    import Car from "@/models/Car";

    @Component({})
    export default class DashboardOrdersOverview extends Vue {
        public cars: Car[] = [];

        mounted() {
            Api.car.findAll().then(response => {
                this.cars = response.data.map(Car.fromJson);
            });


        }
    }
</script>
