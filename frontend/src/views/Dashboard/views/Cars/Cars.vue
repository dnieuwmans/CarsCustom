<template>
    <div>
        <h2>Cars</h2>
        <ul class="dashboard-tabs">
            <li v-for="route in routes" :key="route.title" :class="{'active' : isActive(route) }">
                <router-link :to="{ name: route.name }">
                    <span v-text="route.title"></span>
                </router-link>
            </li>
        </ul>
        <router-view />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    @Component({

    })
    export default class DashboardCars extends Vue {
        // TODO: make an util
         private routes: any = [
            {
                name: 'dashboard:cars:overview',
                title: 'Overview',
            },
            {
                name: 'dashboard:cars:new',
                title: 'New Car',
            },
            {
                name: 'dashboard:cars:statistics',
                title: 'Statistics',
            },
        ];

        isActive(route: any) {
            return route.name === this.$route.name;
        }
    }
</script>
