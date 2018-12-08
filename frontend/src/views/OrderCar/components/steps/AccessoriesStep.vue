<template>
    <div class="order-panel col">
        <h4>Select Accessories</h4>
        <p>Customize your dream car to your own needs!</p>

        <div class="alert alert-info" v-if="order.selectedCar.accessories.length === 0">
            <i class="fas fa-info"></i>
            This car doesn't have any accessories, yet.
        </div>
        <div class="alert alert-info" v-else>
            <i class="fas fa-info"></i>
            <strong>Note:</strong> every addition will add extra costs to the total price.
        </div>

        <ul class="list-unstyled order-accessories"
            v-if="order.selectedCar.accessories.length !== 0">
            <li v-for="accessory in order.selectedCar.accessories"
                @click="accessoryHandler(accessory)">
                <span class="check-handler"
                      :class="{ 'is-checked': containsAccessory(accessory) }">
                    <i class="fal fa-check"></i>
                </span>
                <span class="order-accessories__description"
                      v-text="accessory.description"></span>
                <span class="order-accessories__cost" v-text="accessory.formattedCost"></span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Accessory from "@/models/Accessory";
    import {cloneDeep} from 'lodash';

    @Component({
        name: 'AccessoriesStep',
    })
    export default class AccessoriesStep extends Vue {
        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public accessoryHandler(accessory: Accessory) {
            if (this.containsAccessory(accessory)) {
                this.$store.commit('Order/removeAccessory', cloneDeep(accessory));
            } else {
                this.$store.commit('Order/addAccessory', cloneDeep(accessory));
            }
        }

        public containsAccessory(accessory: Accessory) {
            const foundItem = this.order.selectedAccessories.find((a) => {
                return a.id === accessory.id;
            });

            return foundItem != null;
        }
    }
</script>