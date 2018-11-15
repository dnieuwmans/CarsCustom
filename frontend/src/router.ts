import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue' ),
        },
        {
            path: '/explore-cars',
            name: 'explore-cars',
            component: () => import(/* webpackChunkName: "explore-cars" */ '@/views/ExploreCars/ExploreCars.vue' ),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import(/* webpackChunkName: "order" */ '@/views/OrderCar/OrderCar.vue' ),
        },
        {
            path: '/order-complete/:token',
            name: 'order-complete',
            component: () => import(/* webpackChunckName: "order-complete" */ '@/views/OrderComplete/OrderComplete.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import(/* webpackChunckName: "dashboard" */ '@/views/Dashboard/Dashboard.vue'),
            children: [
                {
                    path: '',
                    name: 'dashboard:orders',
                    component: () => import(/* webpackChunckName: "dashboard-orders" */ '@/views/Dashboard/views/Orders/Orders.vue'),
                },
                {
                    path: 'cars',
                    name: 'dashboard:cars',
                    component: () => import(/* webpackChunckName: "dashboard-cars" */ '@/views/Dashboard/views/Cars/Cars.vue'),
                },
                {
                    path: 'users',
                    name: 'dashboard:users',
                    component: () => import(/* webpackChunckName: "dashboard-users" */ '@/views/Dashboard/views/Users/Users.vue'),
                },
            ],
        },
    ],
});

export default router;
