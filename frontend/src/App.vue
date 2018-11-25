<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Order } from "@/models/Order";
    import Car from "@/models/Car";

    @Component({
        name: 'App',
    })
    export default class App extends Vue {
        public beforeCreate() {
            // Let's load the order which is store in the localStorage
            // Yes I know what I am doing!
            // @ts-ignore-line
            let storedOrder = JSON.parse(localStorage.getItem('order'));

            if (storedOrder != null) {
                storedOrder.selectedCar = Car.fromJson(storedOrder.selectedCar);

                // Commit it to the store so we can use it
                this.$store.commit('Order/setOrder', new Order(storedOrder));
            }
        }

        mounted() {
            // this.$auth.login('danny', 'danny').then((response) => {
            //     console.log(response);
            // })
        }
    }
</script>
