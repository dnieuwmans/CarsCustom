<template>
    <div>
        <h2>Cars</h2>
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
    export default class DashboardCars extends Vue {
         private routes: RouteInterface = [
            {
                name: 'dashboard:cars:overview',
                title: 'Overview',
            },
            {
                name: 'dashboard:cars:new',
                title: 'New Car',
            },
        ];
    }
</script>
