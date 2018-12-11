<template>
    <div>
        <h2>Orders</h2>
        <dashboard-tabs :routes="routes" />
        <router-view />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import RouteInterface from '@/interfaces/RouteInterface';
    import DashboardTabs from '@/views/Dashboard/components/DashboardTabs.vue';
    @Component({
        components: {
            DashboardTabs,
        }
    })
    export default class DashboardOrders extends Vue {
        private routes: RouteInterface[] = [
            {
                name: 'dashboard:orders:overview',
                title: 'Overview',
            },
            {
                name: 'dashboard:orders:statistics',
                title: 'Statistics',
            },
        ];
    }
</script>
