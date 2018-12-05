<template>
    <div class="order-car">
        <main-nav/>

        <div class="order-car-container" v-if="order != null">
            <div class="order-car__sidebar">
                <div>
                    <h4>My Order</h4>
                    <p class="sub-title">Your full order will be presented below and updated throughout the order
                        process.</p>
                </div>
                <div>
                    <figure class="order-car__car-image">
                        <transition name="slide-fade" mode="out-in">
                            <img :src="`img/${image}`"
                                 alt=""
                                 v-for="(image, key) in order.selectedCar.images"
                                 :key="key"
                                 v-if="key === order.selectedColor"
                            />
                        </transition>
                    </figure>

                    <ul class="list-unstyled order-car__order-info">
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
            <div class="order-car__main">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <ul class="order-steps">
                                <li v-for="step in order.steps"
                                    :class="{ 'is-done': step.completed === 100, 'is-active': step.completed !== 100 && step.id === order.activeStep }">
                                    <span class="order-steps__indicator">
                                        <i class="far" :class="step.completed === 100 ? 'fa-check' : 'fa-clock'"
                                           v-if="step.completed === 100 || step.id === order.activeStep"></i>
                                    </span>
                                    <span class="order-steps__info">{{ step.name }}</span>
                                    <div class="order-steps__progress"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="order-panels container">
                    <div class="row">
                        <transition name="fade" mode="out-in">
                            <color-step
                                    v-if="order.activeStep === stepsEnum.COLOR"
                                    :key="stepsEnum.COLOR"
                            />

                            <accessories-step
                                    v-if="order.activeStep === stepsEnum.ACCESSORY"
                                    :key="stepsEnum.ACCESSORY"
                            />

                            <user-info-step
                                    v-if="order.activeStep === stepsEnum.USER_INFO"
                                    :key="stepsEnum.USER_INFO"
                                    :order-user="this.orderUser"
                                    :fields-validation="this.fieldsValidation"
                            />

                            <summary-step
                                    v-if="order.activeStep === stepsEnum.SUMMARY"
                                    :key="stepsEnum.SUMMARY"
                            />

                            <payment-step
                                    v-if="order.activeStep === stepsEnum.PAYMENT"
                                    :key="stepsEnum.PAYMENT"
                            />
                        </transition>
                    </div>
                </div>

                <div class="order-navigation">
                    <div class="btn-group">
                        <button class="btn btn-outline-primary"
                                @click="previousStep"
                                v-if="order.activeStep !== stepsEnum.COLOR"
                        >
                            <i class="fal fa-chevron-left"></i>
                            <span>Previous Step</span>
                        </button>
                        <button class="btn btn-primary order-bar-btn__same-size"
                                @click="nextStep"
                                v-if="!(order.activeStep === stepsEnum.PAYMENT || order.activeStep === stepsEnum.USER_INFO)"
                        >
                            <span>Next Step</span>
                            <i class="fal fa-chevron-right"></i>
                        </button>
                        <button class="btn btn-primary order-bar-btn__same-size"
                                v-if="order.activeStep === stepsEnum.USER_INFO"
                                @click="continueToSummary"
                        >
                            <span>Order Overview</span>
                            <i class="fal fa-chevron-right"></i>
                        </button>
                        <button class="btn btn-success order-bar-btn__same-size"
                                v-if="order.activeStep === stepsEnum.PAYMENT"
                                @click="placeOrder"
                        >
                            <span>Place Order & Pay</span>
                            <i class="fal fa-check"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';
    import {stepsEnum} from '../../models/Order';
    import OrderBar from "./components/OrderBar.vue";
    import OrderUser from "../../models/OrderUser";
    import {cloneDeep} from 'lodash';
    import Validation from "../../utils/Validation";
    import Api from "@/api/Api";
    import ColorStep from "./components/steps/ColorStep";
    import AccessoriesStep from "./components/steps/AccessoriesStep";
    import UserInfoStep from "./components/steps/UserInfoStep";
    import SummaryStep from "./components/steps/SummaryStep";
    import PaymentStep from "./components/steps/PaymentStep";

    enum fieldsEnum {
        FIRSTNAME = 'firstName',
        LASTNAME = 'lastName',
        STREET = 'street',
        STREETNUMBER = 'streetNumber',
        CITY = 'city',
        ZIPCODE = 'zipCode',
        PHONE = 'phone',
        EMAIL = 'email',
    }

    @Component({
        name: 'OrderCar',
        components: {
            PaymentStep,
            SummaryStep,
            UserInfoStep,
            AccessoriesStep,
            ColorStep,
            OrderBar,
            MainNav,
        }
    })
    export default class OrderCar extends Vue {
        public continueOrderModal: boolean = false;
        public stepsEnum = stepsEnum;
        public fieldsEnum = fieldsEnum;
        public orderUser = OrderUser.init(); // Because we are lazy ;)
        public fieldsValidation: Validation = new Validation({});

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        get image() {
            if ('selectedCar' in this.order) {
                return this.order.selectedCar.images[this.order.selectedColor];
            }

            return '';
        }

        public mounted() {
            if (this.order == null) {
                this.$router.push({name: 'explore-cars', query: {state: '1'}});
                return;
            }

            // check if either of the fields are set, if not we can preload the user info if the user is logged in.
            let isEmpty = true;

            for(let userField in this.order.orderUser) {
                if (userField === 'id') continue;

                if (this.order.orderUser[userField] != '') {
                    isEmpty = false;
                    break;
                }
            }

            // This is optically better to understand
            if (isEmpty) {
                // Check if the user is logged in
                if (this.$auth.user != null) {

                    // Get the user info.
                    this.orderUser = cloneDeep(OrderUser.fromJson(this.$auth.user));
                }

            } else {
                // Remap the items and remove any references if they are there.
                this.orderUser = cloneDeep(this.order.orderUser);
            }

            this.fieldsValidation = new Validation(cloneDeep(this.orderUser));
        }

        public nextStep() {
            this.$store.commit('Order/nextStep');
        }

        public previousStep() {
            this.$store.commit('Order/previousStep');
        }

        public continueToSummary() {
            // Recheck the fields
            this.fieldsValidation.string(fieldsEnum.FIRSTNAME, this.orderUser[fieldsEnum.FIRSTNAME], 2, 100);
            this.fieldsValidation.string(fieldsEnum.LASTNAME, this.orderUser[fieldsEnum.LASTNAME], 2, 100);
            this.fieldsValidation.string(fieldsEnum.ZIPCODE, this.orderUser[fieldsEnum.ZIPCODE], 6, 6);
            this.fieldsValidation.string(fieldsEnum.STREETNUMBER, this.orderUser[fieldsEnum.STREETNUMBER], 1, 6);
            this.fieldsValidation.phone(fieldsEnum.PHONE, this.orderUser[fieldsEnum.PHONE]);
            this.fieldsValidation.email(fieldsEnum.EMAIL, this.orderUser[fieldsEnum.EMAIL]);

            // Don't do anything whenever we got errors...
            if (this.fieldsValidation.hasErrors()) {
                return;
            }

            this.$store.commit('Order/nextStep');
        }

        public placeOrder() {
            // Don't do anything whenever we got errors...
            if (this.fieldsValidation.hasErrors()) {
                return;
            }

            // This will make sure that there will be no reference
            const clonedOrder = cloneDeep(this.order);

            // Add the order to the database
            Api.order.addOrder(clonedOrder.toJson()).then((response) => {
                const token = response.data.token;

                if (token) {
                    // Delete the order
                    this.$store.commit('Order/removeOrder');

                    // Continue to the order complete page with a token.
                    this.$router.push({
                        name: 'order-complete', params: {
                            token,
                        }
                    });
                }
            });
        }
    }
</script>