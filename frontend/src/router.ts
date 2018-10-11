import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import( '@/views/Home.vue' ),
        },
        {
            path: '/explore-cars',
            name: 'explore-cars',
            component: () => import( '@/views/ExploreCars.vue' ),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import( '@/views/OrderCar.vue' ),
        }
    ],
});
