<template>
    <div class="box car-card">
        <div class="car-card__header">
            <figure>
                <img :src="`img/${car.image}`" class="img-fluid" alt="">
            </figure>
        </div>
        <div class="car-card__body">
            <div class="car-card__body-top">

                <span class="car-price">{{ car.formattedPrice }}</span>
                <ul class="car-colors">
                    <li v-for="color in car.colors" :key="color" class="car-colors__item">
                        <span :style="{ background: color }"></span>
                    </li>
                </ul>
            </div>

            <div class="car-card__body-middle">
                <span class="car-brand">{{ car.brand }} {{ car.type }}</span>
                <span class="car-description">{{ car.description }}</span>
            </div>

            <div class="car-card__body-footer">
                <button class="btn btn-primary btn-block" @click="$emit('CarCard:Customize')">
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
    }
</script>