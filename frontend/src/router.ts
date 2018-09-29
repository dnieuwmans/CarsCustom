import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import ExploreCars from './views/ExploreCars.vue';
import OrderCar from './views/OrderCar.vue';

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
            component: OrderCar
        }
    ],
});
