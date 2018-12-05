<template>
    <div class="order-panel col">
        <h4>Select the color of your new ride!</h4>
        <div class="alert alert-info">
            <i class="fas fa-info"></i>
            <strong>Did you know</strong> clicking on a color will actually change the color of
            the shown car, try it!
        </div>
        <ul class="car-colors car-colors--lg">
            <li
                    v-for="(color, key) in order.selectedCar.colors"
                    :key="color.id"
                    :title="color.name"
                    :class="{'car-colors__item--active': key === order.selectedColor}"
                    class="car-colors__item"
                    @click="selectColor(key)"
            >
                <span :style="{ background: color.hex }"></span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'ColorStep',
    })
    export default class ColorStep extends Vue {
        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public selectColor(key: number) {
            this.$store.commit('Order/setSelectedColor', key);
        }
    }
</script>