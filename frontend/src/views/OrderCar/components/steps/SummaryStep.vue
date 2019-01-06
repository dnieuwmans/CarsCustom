<template>
    <div class="order-panel col">
        <h4>Summary</h4>
        <p>Hold on tight, {{ order.orderUser.firstName}}. We are almost there. Please verify
            your order on the left and the information before continue.</p>


        <!--<h5 class="mb-4">User Information</h5>-->

        <ul class="list-unstyled order-car__order-info">
            <li>
                <i class="fal fa-user"></i>
                {{ order.orderUser.fullName }}
            </li>
            <li>
                <i class="fal fa-envelope"></i>
                {{ order.orderUser.email }}
            </li>
            <li>
                <i class="fal fa-map-pin"></i>
                {{ order.orderUser.address }}
            </li>
            <li>
                <i class="fal fa-phone"></i>
                {{ order.orderUser.phone }}
            </li>
        </ul>

        <div v-if="isMobile">
            <ul class="list-unstyled order-car__order-info">
                <li>
                    <hr>
                </li>
                <li>
                    <i class="fal fa-car"></i>
                    {{ order.selectedCar.fullDescription }}
                </li>
                <li>
                    <i class="fal fa-palette"></i>
                    {{ order.selectedColorObject }}
                </li>
                <li>
                    <i class="fal fa-usd-circle"></i>
                    {{ order.selectedCar.formattedPrice }}
                </li>
            </ul>

            <ul class="list-unstyled order-car__order-info order-car__accessories-info"
                v-if="order.selectedAccessories.length > 0">
                <li v-for="accessory in order.selectedAccessories">
                    <i class="fal fa-plus-circle"></i>
                    <span v-text="accessory.description"></span>
                    <span v-text="accessory.formattedCost"></span>
                </li>
            </ul>

            <p><strong>Total</strong></p>
            <ul class="list-unstyled order-car__order-info">
                <li>
                    <i class="fal fa-usd-circle"></i>
                    {{ order.totalPrice }}
                </li>
            </ul>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'SummaryStep',
    })
    export default class SummaryStep extends Vue {
        public isMobile: boolean = false;

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.isMobileHandler);


                this.isMobileHandler();
            });
        }

        public isMobileHandler() {
            this.isMobile =  window.innerWidth < 992;
        }

        public selectColor(key: number) {
            this.$store.commit('Order/setSelectedColor', key);
        }
    }
</script>