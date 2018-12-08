<template>
    <div>
        <h2>Users</h2>
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
    export default class DashboardUsers extends Vue {
         private routes: RouteInterface = [
            {
                name: 'dashboard:users:overview',
                title: 'Overview',
            },
            {
                name: 'dashboard:users:new',
                title: 'New User',
            },
        ];
    }
</script>
