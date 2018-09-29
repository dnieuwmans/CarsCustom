import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import ExploreCars from './views/ExploreCars.vue';
import Order from './views/Order.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/explore-cars',
            name: 'explore-cars',
            component: ExploreCars,
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        }
    ],
});
