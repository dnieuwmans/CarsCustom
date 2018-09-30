<template>
    <div class="box car-card">
        <div class="car-card__header">
            <figure>
                <transition name="slide-fade" mode="out-in">
                    <img :src="`img/${image}`"
                         class="img-fluid"
                         alt=""
                         v-for="(image, key) in car.images"
                         :key="key"
                         v-if="key === selectedColor"
                    />
                </transition>
            </figure>
        </div>
        <div class="car-card__body">
            <div class="car-card__body-top">

                <span class="car-price">{{ car.formattedPrice }}</span>
                <ul class="car-colors">
                    <li
                            v-for="(color, key) in car.colors"
                            :key="color.id"
                            :title="color.name"
                            :class="{'car-colors__item--active': key === selectedColor}"
                            class="car-colors__item"
                            @click="selectColor(key)"
                    >
                        <span :style="{ background: color.hex }"></span>
                    </li>
                </ul>
            </div>

            <div class="car-card__body-middle">
                <span class="car-brand">{{ car.brand }} {{ car.type }}</span>
                <span class="car-description">{{ car.description }}</span>
            </div>

            <div class="car-card__body-footer">
                <button class="btn btn-primary btn-block" @click="$emit('CarCard:Customize', car, selectedColor)">
                    <span>Customize</span>
                    <i class="fas fa-wrench"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        name: 'CarCard',
        props: {
            car: {
                type: Object,
                required: true,
            }
        }
    })
    export default class CarCard extends Vue {
        public selectedColor: number = 0;

        get image() {
            return this.$props.car.images[this.selectedColor];
        }

        public selectColor(key: number) {
            this.selectedColor = key;
        }
    }
</script>