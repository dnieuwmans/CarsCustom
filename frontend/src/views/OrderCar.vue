<template>
    <div class="order-car">
        <main-nav/>

        <header class="order-car-header" v-if="order != null">
            <div class="order-detail" v-if="order.selectedCar != null">
                <div class="order-detail__info">
                    <h2>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</h2>
                    <h4>{{ order.selectedCar.description }}</h4>
                </div>
                <figure class="order-detail__image">
                    <transition name="slide-fade" mode="out-in">
                        <img :src="`img/${image}`"
                             alt=""
                             v-for="(image, key) in order.selectedCar.images"
                             :key="key"
                             v-if="key === order.selectedColor"
                        />
                    </transition>
                </figure>
            </div>

            <div class="scroll-down-icon"></div>
        </header>

        <!--TODO: make it a component-->
        <div class="order-panels container">
            <transition name="fade" mode="out-in">
                <div class="order-panel col" v-if="order.activeStep === stepsEnum.COLOR" :key="stepsEnum.COLOR">
                    <h2>Select a color</h2>
                    <p><strong>Note:</strong> clicking on a color will actually changes the color of the shown car, try
                        it!</p>

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

                <div class="order-panel col" v-if="order.activeStep === stepsEnum.ACCESSORY" :key="stepsEnum.ACCESSORY">
                    <h2>Select Accessories</h2>
                    <div class="alert alert-warning">This section is under construction</div>
                </div>

                <div class="order-panel col" v-if="order.activeStep === stepsEnum.USER_INFO" :key="stepsEnum.USER_INFO">
                    <h2>User information</h2>

                    <div class="row">
                        <div class="col form-group">
                            <label for="first-name">First Name</label>
                            <input type="text" id="first-name" class="form-control">
                        </div>
                        <div class="col form-group">
                            <label for="last-name">Last Name</label>
                            <input type="text" id="last-name" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label for="address">Address
                                <small>(Street name and number)</small>
                            </label>
                            <input type="text" id="address" class="form-control">
                        </div>
                        <div class="col form-group">
                            <label for="city">City</label>
                            <input type="text" name="city" class="form-control">
                        </div>
                        <div class="col form-group">
                            <label for="zip-code">Zip-code</label>
                            <input type="text" id="zip-code" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label for="phone">Phone</label>
                            <input type="text" id="phone" class="form-control">
                        </div>
                        <div class="col form-group">
                            <label for="email">Email</label>
                            <input type="text" id="email" class="form-control">
                        </div>
                    </div>
                </div>

                <div class="order-panel col" v-if="order.activeStep === stepsEnum.SUMMARY" :key="stepsEnum.SUMMARY">
                    <h2>Summary</h2>
                    <p>We are almost there! Please verify your order before continue.</p>

                    <div class="row">
                        <div class="col">
                            <h5>Your Order</h5>
                            <hr>

                            <p>
                                <Strong>Car:</Strong> <br/>
                                <span>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</span> - <em>{{ order.selectedCar.description }}</em>
                            </p>
                            <p>
                                <strong>Selected color:</strong> {{ order.selectedColorObject }} <br>
                                <strong>Selected Accessories</strong>
                            </p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Deserunt eligendi et illo ipsa.</li>
                                <li>Aliquid commodi cumque porro soluta?</li>
                                <li>Animi eveniet neque voluptas voluptates!</li>
                                <li>Architecto incidunt odio vero voluptas.</li>
                            </ul>
                        </div>

                        <div class="col">
                            <h5>User Information</h5>
                            <hr>

                            <p>
                                <strong>Name:</strong> Danny Nieuwmans <br>
                                <strong>Address:</strong> Gravin Aleidisstraat 26, 's-Gravenzande - 2691ZZ <br>
                                <strong>Phone:</strong> 06 12345678 <br>
                                <strong>Email:</strong> dannynieuwmans@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div class="order-bar">
            <div class="order-bar__price">{{ order.totalPrice }}</div>
            <div class="order-bar__step">({{ order.activeStep}}/{{order.steps.length}}) {{ order.activeStepName }}</div>
            <!--TODO: make the progress shit better-->
            <!--<ul class="order-progress">
                <li class="order-progress__item" v-for="(step, key) in order.steps" :class="{'is-active': (key + 1) === order.activeStep, 'is-completed': step.completed === 100 }"></li>
            </ul>-->
            <div class="order-bar__navigation">
                <div class="btn-group">
                    <button class="btn btn-primary" @click="order.previousStep()"
                            v-if="order.activeStep !== stepsEnum.COLOR">Previous Step
                    </button>
                    <button class="btn btn-primary" @click="order.nextStep()"
                            v-if="order.activeStep !== stepsEnum.SUMMARY">
                        Next Step
                    </button>
                    <button class="btn btn-success" v-if="order.activeStep === stepsEnum.SUMMARY">Place Order</button>
                </div>
            </div>
        </div>

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
        public stepsEnum = stepsEnum;

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

        // TODO: pretify this
        public selectColor(key: number) {
            // console.log(color);
            this.order.setSelectedColor(key);
        }
    }
</script>