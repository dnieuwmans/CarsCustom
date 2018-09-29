import Vue from 'vue';
import Vuex from 'vuex';
import Order from "@/store/modules/Order";

Vue.use(Vuex);

// @ts-ignore
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        Order,
    }
})