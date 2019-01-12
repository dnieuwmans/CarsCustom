<template>
    <ul class="dashboard-tabs">
            <li v-for="route in routes" :key="route.title" :class="{'active' : isActive(route) }" v-if="isVisible(route)">
                <router-link :to="{ name: route.name }">
                    <span v-text="route.title"></span>
                </router-link>
            </li>
        </ul>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    @Component({
        name: 'DashboardTabs',
        props: {
            routes: {
                type: Array,
                required: true,
            },
        }
    })
    export default class DashboardTabs extends Vue {
        public isActive(route: any) {
            return route.name === this.$route.name;
        }

        public isVisible(route: any) {
            if (!('onlyAtRoute' in route)) {
                return true;
            }

            if (route.onlyAtRoute) {
                return this.$route.name === route.name;
            }

            return true;
        }
    }
</script>