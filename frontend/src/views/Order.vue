<template>
    <div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainLogo from "@/components/MainLogo.vue";
    import Car from "../models/Car";

    const namespace: string = 'Order';

    @Component({
        name: 'Order',
        components: {
            MainLogo
        }
    })
    export default class Order extends Vue {
        get selectedCar() {
            return this.$store.getters['Order/getSelectedCar'];
        }

        public mounted() {
            // TODO: check if we selected a car already
            // TODO: create order object
            console.log(this.selectedCar);
        }
    }
</script>