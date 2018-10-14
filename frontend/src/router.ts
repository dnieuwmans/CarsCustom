import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue' ),
        },
        {
            path: '/explore-cars',
            name: 'explore-cars',
            component: () => import(/* webpackChunkName: "explore-cars" */ '@/views/ExploreCars.vue' ),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import(/* webpackChunkName: "order" */ '@/views/OrderCar.vue' ),
        }
    ],
});

router.beforeEach((to, from, next) => {
    const previousRoute: string = from.name || '';

    // So we can watch from which route we came from
    localStorage.setItem('previous-route', previousRoute);
    next();
});

export default router;
