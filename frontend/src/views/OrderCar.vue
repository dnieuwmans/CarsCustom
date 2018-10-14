<template>
    <div class="order-car">
        <main-nav/>

        <header class="order-car-header" v-if="order != null">
            <div class="container">
                <ul class="order-steps">
                    <li v-for="(step, key) in order.steps"
                        :class="{'is-active': (key + 1) === order.activeStep, 'is-completed': step.completed === 100 }">
                        <span class="order-steps__indicator" v-text="step.id"></span>
                        <span class="order-steps__info" v-text="step.name"></span>

                        <div class="order-steps__progress" :style="{'width': `calc(${step.completed}% - 3rem)`}"></div>
                    </li>
                </ul>
            </div>

            <div class="order-detail" v-if="order.selectedCar != null">
                <div class="order-detail__info">
                    <h2>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</h2>
                    <h4>{{ order.selectedCar.description }}</h4>
                </div>
                <figure class="order-detail__image">
                    <img :src="`img/${image}`" alt="">
                </figure>
            </div>
        </header>

        <transition name="modal">
            <main-modal v-if="continueOrderModal">
                <h5 slot="header">You are about to change the order</h5>
                <p slot="body">
                    You are about to change the order, this action will overwrite the existing order. Are you sure?
                </p>
                <div slot="footer">
                    <button type="button" class="btn btn-primary" @click="continueOrderModalPositive()">
                        Yes, I am sure
                    </button>
                    <button type="button" class="btn btn-secondary" @click="continueOrderModalNegative()">Close</button>
                </div>
            </main-modal>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '@/components/MainNav.vue';
    import {Order, stepsEnum} from '@/models/Order';
    import Car from '@/models/Car';
    import MainModal from '@/components/MainModal.vue';

    @Component({
        name: 'OrderCar',
        components: {
            MainModal,
            MainNav,
        }
    })
    export default class OrderCar extends Vue {
        public order: Order | any = {};
        public continueOrderModal: boolean = false;

        get selectedColor() {
            return this.$store.getters['Order/getSelectedColor'];
        }

        get selectedCar() {
            return this.$store.getters['Order/getSelectedCar'];
        }

        get image() {
            if ('selectedCar' in this.order) {
                return this.order.selectedCar.images[this.order.selectedColor];
            }

            return '';
        }

        public mounted() {
            // Check if the customer wants to start a new order
            if (localStorage.getItem('previous-route') === 'explore-cars') {
                this.continueOrderModal = true;
                document.body.className = 'modal-open';
            }

            let storedOrder: any = null;

            if (localStorage.getItem('order') != null) {
                // Yes I know what I am doing!
                // @ts-ignore-line
                storedOrder = JSON.parse(localStorage.getItem('order'));
            }

            // Check if we got a car selected
            if (this.selectedCar == null && storedOrder == null) {
                this.$router.push({name: 'explore-cars', query: {state: '1'}});
                return;
            }

            // Store the order in localStorage
            if (localStorage.getItem('order') == null) {
                // Creates the order instance
                this.order = new Order({
                    id: 0,
                    selectedCar: this.selectedCar,
                    selectedColor: this.selectedColor,
                    activeStep: stepsEnum.COLOR,
                });
            } else {
                // Let's restore it! make sure to map the objects again
                storedOrder.selectedCar = Car.fromJson(storedOrder.selectedCar);
                this.order = new Order(storedOrder);
            }

            // Testing
            setTimeout(() => {
                this.order.nextStep();
            }, 2000)

        }

        public continueOrderModalNegative() {
            // Now hide the modal again
            this.continueOrderModal = false;
            document.body.className = '';
        }

        public continueOrderModalPositive() {
            this.order = new Order({
                id: 0,
                selectedCar: this.selectedCar,
                selectedColor: this.selectedColor,
                activeStep: stepsEnum.COLOR,
            });

            this.continueOrderModalNegative();
        }
    }
</script>