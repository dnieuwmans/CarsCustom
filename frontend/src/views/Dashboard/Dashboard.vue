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
                <li>
                    <a href="#" @click.stop="logout">
                        <i class="fal fa-fw fa-power-off"></i>
                        <span>Logout</span>
                    </a>
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
    import RouteInterface from '@/interfaces/RouteInterface';
    import MainLogo from '@/components/MainLogo.vue';
    @Component({
        name: 'Dashboard',
        components: {
            MainLogo,
        }
    })
    export default class Dashboard extends Vue {
        private routes: RouteInterface[] = [
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
            },
        ];

        isActive(route: any) {
            if (this.$route.name == null) {
                return false;
            }

            return this.$route.name.includes(route.parent);
        }

        logout() {
            this.$auth.logout();
            this.$router.push('/');
        }
    }
</script>
