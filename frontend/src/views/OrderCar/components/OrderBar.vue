<template>
    <div class="order-bar">
        <div class="order-bar__price">{{ order.totalPrice }}</div>
        <div class="order-bar__step">({{ order.activeStep}}/{{order.steps.length}}) {{ order.activeStepName }}</div>
        <!--TODO: make the progress shit better-->
        <!--<ul class="order-progress">
            <li class="order-progress__item" v-for="(step, key) in order.steps" :class="{'is-active': (key + 1) === order.activeStep, 'is-completed': step.completed === 100 }"></li>
        </ul>-->
        <div class="order-bar__navigation">
            <div class="btn-group">
                <button class="btn btn-outline-primary"
                        @click="$emit('order-bar:previous')"
                        v-if="order.activeStep !== stepsEnum.COLOR"
                >
                    <i class="fal fa-chevron-left"></i>
                    <span>Previous Step</span>
                </button>
                <button class="btn btn-primary order-bar-btn__same-size"
                        @click="$emit('order-bar:next')"
                        v-if="!(order.activeStep === stepsEnum.SUMMARY || order.activeStep === stepsEnum.USER_INFO)"
                >
                    <span>Next Step</span>
                    <i class="fal fa-chevron-right"></i>
                </button>
                <button class="btn btn-primary order-bar-btn__same-size"
                        v-if="order.activeStep === stepsEnum.USER_INFO"
                        @click="$emit('order-bar:next-from-user')"
                >
                    <span>Order Overview</span>
                    <i class="fal fa-chevron-right"></i>
                </button>
                <button class="btn btn-success order-bar-btn__same-size"
                        v-if="order.activeStep === stepsEnum.SUMMARY"
                        @click="$emit('order-bar:place-order')"
                >
                    <span>Place Order</span>
                    <i class="fal fa-check"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Order, stepsEnum} from "../../../models/Order";
    import Validation from "../../../utils/Validation";

    @Component({
        name: 'OrderBar',
        props: {
            order: {
                type: Order,
                required: true,
            },
            validation: {
                type: Validation,
                required: true,
            }
        }
    })
    export default class OrderBar extends Vue {
        public stepsEnum = stepsEnum;
    }
</script>