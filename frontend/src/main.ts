import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './sass/app.scss';
import Auth from './auth';

Vue.config.productionTip = false;

// @ts-ignore
// TODO: find a better way
Vue.use(Auth);

// So we can use this.$auth everywhere in a vue instance.
declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
