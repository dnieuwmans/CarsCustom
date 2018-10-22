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
                <button class="btn btn-primary" @click="$emit('order-bar:previous')"
                        v-if="order.activeStep !== stepsEnum.COLOR">Previous Step
                </button>
                <button class="btn btn-primary" @click="$emit('order-bar:next')"
                        v-if="order.activeStep !== stepsEnum.SUMMARY">
                    Next Step
                </button>
                <button class="btn btn-success" v-if="order.activeStep === stepsEnum.SUMMARY">Place Order</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Order, stepsEnum} from "../../../models/Order";

    @Component({
        name: 'OrderBar',
        props: {
            order: {
                type: Order,
                required: true,
            }
        }
    })
    export default class OrderBar extends Vue {
        public stepsEnum = stepsEnum;
    }
</script>