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
            component: () => import(/* webpackChunckName: "dashboard" */ '@/views/Dashboard/Dashboard.vue'),
            children: [
                {
                    path: '',
                    component: () => import(/* webpackChunckName: "dashboard-orders" */ '@/views/Dashboard/views/Orders/Orders.vue'),
                    children: [
                        {
                            path: '',
                            name: 'dashboard:orders:overview',
                            component: () => import(/* webpackChunckName: "dashboard-orders-overview" */ '@/views/Dashboard/views/Orders/views/OrdersOverview.vue'),
                        },
                        {
                            path: 'statistics',
                            name: 'dashboard:orders:statistics',
                            component: () => import(/* webpackChunckName: "dashboard-orders-statistics" */ '@/views/Dashboard/views/Orders/views/OrdersStatistics.vue'),
                        }
                    ]
                },
                {
                    path: 'cars',
                    component: () => import(/* webpackChunckName: "dashboard-cars" */ '@/views/Dashboard/views/Cars/Cars.vue'),
                    children: [
                        {
                            path: '',
                            name: 'dashboard:cars:overview',
                            component: () => import(/* webpackChunckName: "dashboard-cars-overview" */ '@/views/Dashboard/views/Cars/views/CarsOverview.vue'),
                        },
                        {
                            path: 'new',
                            name: 'dashboard:cars:new',
                            component: () => import(/* webpackChunckName: "dashboard-cars-new" */ '@/views/Dashboard/views/Cars/views/CarsNew.vue'),
                        },
                        {
                            path: 'statistics',
                            name: 'dashboard:cars:statistics',
                            component: () => import(/* webpackChunckName: "dashboard-cars-statistics" */ '@/views/Dashboard/views/Cars/views/CarsStatistics.vue'),
                        }
                    ]
                },
                {
                    path: 'users',
                    component: () => import(/* webpackChunckName: "dashboard-users" */ '@/views/Dashboard/views/Users/Users.vue'),
                    children: [
                        {
                            path: '',
                            name: 'dashboard:users:overview',
                            component: () => import(/* webpackChunckName: "dashboard-users-overview" */ '@/views/Dashboard/views/Users/views/UsersOverview.vue'),
                        },
                        {
                            path: 'new',
                            name: 'dashboard:users:new',
                            component: () => import(/* webpackChunckName: "dashboard-users-new" */ '@/views/Dashboard/views/Users/views/UsersNew.vue'),
                        },
                        {
                            path: 'statistics',
                            name: 'dashboard:users:statistics',
                            component: () => import(/* webpackChunckName: "dashboard-users-statistics" */ '@/views/Dashboard/views/Users/views/UsersStatistics.vue'),
                        }
                    ]
                },
            ],
        },
    ],
});

export default router;
