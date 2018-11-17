<template>
    <div class="dashboard">
        <div class="dashboard__sidebar">
            <div class="logo logo--white logo--smaller">
                 <main-logo/>
            </div>
           
            <ul class="list-unstyled dashboard-navigation">
                <li v-for="route in routes" :key="route.title" :class="{'active' : isActive(route) }">
                    <router-link :to="{ name: route.name }">
                        <i :class="route.icon"></i>
                        <span v-text="route.title"></span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="dashboard__main">
            <router-view />
        </div>        
    </div>
</template>

<script lang="ts">
    // TODO: split the dashboard and the app. 
    import '@/sass/dashboard.scss';
    import {Component, Vue} from "vue-property-decorator";
    import MainLogo from '@/components/MainLogo.vue';
    @Component({
        name: 'Dashboard',
        components: {
            MainLogo,
        }
    })
    export default class Dashboard extends Vue {
        private routes: any = [
            {
                name: 'dashboard:orders:overview',
                parent: 'dashboard:orders',
                title: 'Orders',
                icon: 'fal fa-fw fa-box',
            },
            {
                name: 'dashboard:cars:overview',
                parent: 'dashboard:cars',
                title: 'Cars',
                icon: 'fal fa-fw fa-car',
            },
            {
                name: 'dashboard:users:overview',
                parent: 'dashboard:users',
                title: 'Users',
                icon: 'fal fa-fw fa-users',
            }
        ];

        isActive(route: any) {
            return this.$route.name.includes(route.parent);
        }
    }
</script>
