import Vue from 'vue';
import Router from 'vue-router';
import axios from "axios";
import Api from "@/api/Api";
import { roleEnum } from './utils/Roles';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue' ),
            meta: {
                title: 'Homepage',
            },
        },
        {
            path: '/explore-cars',
            name: 'explore-cars',
            component: () => import(/* webpackChunkName: "explore-cars" */ '@/views/ExploreCars/ExploreCars.vue' ),
            meta: {
                title: 'Explore Cars',
            },
        },
        {
            path: '/my-profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "my-profile" */ '@/views/Profile/Profile.vue' ),
            meta: {
                title: 'My Profile',
            },
        },
        {
            path: '/register-user',
            name: 'register-user',
            component: () => import(/* webpackChunkName: "user" */ '@/views/User/RegisterUser.vue' ),
            meta: {
                title: 'Register',
            },
        },
        {
            path: '/order',
            name: 'order',
            component: () => import(/* webpackChunkName: "order" */ '@/views/OrderCar/OrderCar.vue' ),
            meta: {
                title: 'Order',
            },
        },
        {
            path: '/order-complete/:token',
            name: 'order-complete',
            component: () => import(/* webpackChunckName: "order-complete" */ '@/views/OrderComplete/OrderComplete.vue'),
        },
        {
            path: '/registration-complete',
            name: 'registration-complete',
            component: () => import(/* webpackChunkName: "registration-complete" */ '@/views/User/RegistrationComplete.vue' ),
        },
        {
            path: '/dashboard',
            component: () => import(/* webpackChunckName: "dashboard" */ '@/views/Dashboard/Dashboard.vue'),
            meta: {
                requiresAuth: true,
                title: 'Dashboard'
            },
            children: [
                {
                    path: '',
                    component: () => import(/* webpackChunckName: "dashboard-orders" */ '@/views/Dashboard/views/Orders/Orders.vue'),
                    children: [
                        {
                            path: '',
                            name: 'dashboard:orders:overview',
                            component: () => import(/* webpackChunckName: "dashboard-orders-overview" */ '@/views/Dashboard/views/Orders/views/OrdersOverview.vue'),
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
                        },
                        {
                            path: 'statistics',
                            name: 'dashboard:orders:statistics',
                            component: () => import(/* webpackChunckName: "dashboard-orders-statistics" */ '@/views/Dashboard/views/Orders/views/OrdersStatistics.vue'),
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
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
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
                        },
                        {
                            path: 'new',
                            name: 'dashboard:cars:new',
                            component: () => import(/* webpackChunckName: "dashboard-cars-new" */ '@/views/Dashboard/views/Cars/views/CarsNew.vue'),
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
                        },
                        {
                            path: 'statistics',
                            name: 'dashboard:cars:statistics',
                            component: () => import(/* webpackChunckName: "dashboard-cars-statistics" */ '@/views/Dashboard/views/Cars/views/CarsStatistics.vue'),
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
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
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
                        },
                        {
                            path: 'new',
                            name: 'dashboard:users:new',
                            component: () => import(/* webpackChunckName: "dashboard-users-new" */ '@/views/Dashboard/views/Users/views/UsersNew.vue'),
                            meta: {
                                requiredRoles: [roleEnum.ADMIN, roleEnum.EMPLOYEE],
                            }
                        },
                    ]
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const userToken = localStorage.getItem('token');

    if (userToken != null && !router.app.$auth.isLoaded()) {
        // Make sure to send the token with each api request
        Api.setDefaultHeader('Authorization', 'Bearer ' + userToken);

        // Reload the user.
        router.app.$auth.refresh()
            .then(() => { next() });
    } else {
        if (to.matched.some(route => route.meta.requiresAuth)) {

            // Check if we are logged in.
            if (router.app.$auth.isLoaded()) {
                // Which role does the user need?
                let mayEnter = true;

                // instead of for use the to.meta since it is based on the child to which we navigate to
                if (to.meta.requiredRoles != null) {
                    mayEnter = router.app.$auth.hasRole(to.meta.requiredRoles);
                }

                if (mayEnter) {
                    next();
                    return;
                }
            }

            next({ name: 'home' });
        } else {
            next();
        }
    }
});

// Changes the document title according to the route title.
router.afterEach((to) => {
    document.title = `${to.matched.slice(0)
        .reverse()
        .filter(route => route.meta.title != null)
        .map(route => route.meta.title)
        .join(' - ')} - Cars Customs`;
});

export default router;
