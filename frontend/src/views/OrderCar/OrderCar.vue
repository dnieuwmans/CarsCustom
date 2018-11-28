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
                            <div class="order-panel col" v-if="order.activeStep === stepsEnum.COLOR">
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

                            <div class="order-panel col" v-if="order.activeStep === stepsEnum.ACCESSORY"
                                 :key="stepsEnum.ACCESSORY">
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

                            <div class="order-panel col" v-if="order.activeStep === stepsEnum.USER_INFO"
                                 :key="stepsEnum.USER_INFO">
                                <h4>User information</h4>
                                <div class="alert alert-info">
                                    <i class="fas fa-info"></i>
                                    <strong>Did you know</strong> creating an account will allow us to fill in the buyer
                                    information automatically!
                                </div>

                                <div v-if="fieldsValidation != null">
                                    <div class="row">
                                        <div class="col form-group">
                                            <label for="first-name">First Name</label>
                                            <!-- TODO: make component-->
                                            <input type="text"
                                                   id="first-name"
                                                   class="form-control"
                                                   placeholder="John"
                                                   :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.FIRSTNAME)}"
                                                   v-model="orderUser.firstName"
                                                   @change="updateOrderUser(fieldsEnum.FIRSTNAME)"
                                            >
                                            <div class="invalid-feedback"
                                                 v-text="fieldsValidation.errors[fieldsEnum.FIRSTNAME]"
                                                 v-if="fieldsValidation.hasError(fieldsEnum.FIRSTNAME)"
                                            ></div>
                                        </div>
                                        <div class="col form-group">
                                            <label for="last-name">Last Name</label>
                                            <input
                                                    type="text"
                                                    id="last-name"
                                                    class="form-control"
                                                    placeholder="Doe"
                                                    v-model="orderUser.lastName"
                                                    :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.LASTNAME)}"
                                                    @change="updateOrderUser(fieldsEnum.LASTNAME)"
                                            >
                                            <div class="invalid-feedback"
                                                 v-text="fieldsValidation.errors[fieldsEnum.LASTNAME]"
                                                 v-if="fieldsValidation.hasError(fieldsEnum.LASTNAME)"
                                            ></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-md-2 form-group">
                                            <label for="zip-code">Zip Code</label>
                                            <input type="text"
                                                   id="zip-code"
                                                   class="form-control"
                                                   :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.ZIPCODE)}"
                                                   placeholder="1234AB"
                                                   v-model="orderUser.zipCode"
                                                   @change="updateAddress()"
                                            >
                                            <div class="invalid-feedback"
                                                 v-text="fieldsValidation.errors[fieldsEnum.ZIPCODE]"
                                                 v-if="fieldsValidation.hasError(fieldsEnum.ZIPCODE)"
                                            ></div>
                                        </div>
                                        <div class="col col-md-2 form-group">
                                            <label for="number">Number</label>
                                            <input type="text"
                                                   id="number"
                                                   class="form-control"
                                                   :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.STREETNUMBER)}"
                                                   placeholder="1234"
                                                   v-model="orderUser.streetNumber"
                                                   @change="updateAddress()">
                                            <div class="invalid-feedback"
                                                 v-text="fieldsValidation.errors[fieldsEnum.STREETNUMBER]"
                                                 v-if="fieldsValidation.hasError(fieldsEnum.STREETNUMBER)"
                                            ></div>
                                        </div>
                                        <div class="col">
                                            <label for="address">Address <i class="fas fa-info-circle"></i></label>
                                            <p id="address" style="margin-top: 0.675rem; color: rgba(0,0,0,0.5)">
                                                <!-- TODO: get rid of the inline style -->
                                                <em v-text="`${orderUser.street} ${orderUser.streetNumber}, ${orderUser.city}`"
                                                    v-if="orderUser.city !== ''"></em>
                                            </p>
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
                                            <input type="text"
                                                   id="phone"
                                                   class="form-control"
                                                   :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.PHONE)}"
                                                   placeholder="+31 6 12 23 45 67"
                                                   v-model="orderUser.phone"
                                                   @change="updateOrderUser(fieldsEnum.PHONE)"
                                            >
                                            <div class="invalid-feedback"
                                                 v-text="fieldsValidation.errors[fieldsEnum.PHONE]"
                                                 v-if="fieldsValidation.hasError(fieldsEnum.PHONE)"
                                            ></div>
                                        </div>
                                        <div class="col form-group">
                                            <label for="email">Email</label>
                                            <input type="text"
                                                   id="email"
                                                   class="form-control"
                                                   :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.EMAIL)}"
                                                   placeholder="john.doe@email.com"
                                                   v-model="orderUser.email"
                                                   @change="updateOrderUser(fieldsEnum.EMAIL)"
                                            >
                                            <div class="invalid-feedback"
                                                 v-text="fieldsValidation.errors[fieldsEnum.EMAIL]"
                                                 v-if="fieldsValidation.hasError(fieldsEnum.EMAIL)"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="order-panel col" v-if="order.activeStep === stepsEnum.SUMMARY"
                                 :key="stepsEnum.SUMMARY">
                                <h4>Summary</h4>
                                <p>Hold on tight, {{ order.orderUser.firstName}}. We are almost there. Please verify
                                    your
                                    order before continue.</p>

                                TODO: make it really cool!
                            </div>

                            <div class="order-panel col" v-if="order.activeStep === stepsEnum.PAYMENT"
                                 :key="stepsEnum.PAYMENT">
                                <h4>Order Payment</h4>
                                <div class="alert alert-info">
                                    <i class="fas fa-info"></i>
                                    <strong>Note:</strong> we don't store your credit card information at all! It is only necessary in order to complete the payment.
                                </div>
                                <p>Please select the payment method of your choice.</p>

                                <ul class="list-unstyled order-payment-method">
                                    <li v-for="paymentMethod in paymentMethodsEnum"
                                        :class="{ 'is-active' : selectedPaymentMethod === paymentMethod }"
                                        @click="selectPayment(paymentMethod)">
                                        <i class="fab" :class="`fa-cc-${paymentMethod}`"></i>
                                    </li>
                                </ul>


                                <div class="row" v-if="selectedPaymentMethod !== ''">
                                    <div class="col col-md-6 form-group">
                                        <label for="">Card Number</label>
                                        <input type="text" class="form-control" placeholder="Card Number">
                                    </div>
                                    <div class="col form-group">
                                        <label for="">Expiry</label>
                                        <input type="text" class="form-control" placeholder="MM/YYYY">
                                    </div>
                                    <div class="col form-group">
                                        <label for="">CVV</label>
                                        <input type="text" class="form-control" placeholder="0000">
                                    </div>
                                </div>
                            </div>

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
    import Accessory from "../../models/Accessory";
    import {cloneDeep} from 'lodash';
    import Validation from "../../utils/Validation";
    import Api from "@/api/Api";

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

    enum paymentMethodsEnum {
        VISA = 'visa',
        STRIPE = 'stripe',
        MASTERCARD = 'mastercard',
        AMEX = 'amex',
        DISCOVER = 'discover',
        JCB = 'jcb',
        DINERS_CLUB = 'diners-club',
    }

    @Component({
        name: 'OrderCar',
        components: {
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
        public selectedPaymentMethod = '';
        public paymentMethodsEnum = paymentMethodsEnum;


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

            // Remap the items and remove any references if they are there.
            this.orderUser = cloneDeep(this.order.orderUser);
            this.fieldsValidation = new Validation(cloneDeep(this.order.orderUser));
        }

        public selectColor(key: number) {
            this.$store.commit('Order/setSelectedColor', key);
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

        public nextStep() {
            this.$store.commit('Order/nextStep');
        }

        public previousStep() {
            this.$store.commit('Order/previousStep');
        }

        public updateAddress() {
            const zipCode = this.orderUser.zipCode;
            const streetNumber = this.orderUser.streetNumber;

            if (zipCode === '' || streetNumber === '') {
                this.updateOrderUser(fieldsEnum.ZIPCODE);
                this.updateOrderUser(fieldsEnum.STREETNUMBER);

                return;
            }

            const parsedStreetNumber = Number.parseInt(streetNumber, 10);

            // Checks if the number is actually a number.
            if (Number.isNaN(parsedStreetNumber)) {
                return;
            }

            // Let's check again.
            this.updateOrderUser(fieldsEnum.ZIPCODE);
            this.updateOrderUser(fieldsEnum.STREETNUMBER);

            // We may not have any errors
            if (this.fieldsValidation.hasError(fieldsEnum.ZIPCODE) || this.fieldsValidation.hasError(fieldsEnum.STREETNUMBER)) {
                return;
            }

            Api.address.getAddress(zipCode, parsedStreetNumber).then((response) => {
                let data = response.data._embedded.addresses[0];

                this.orderUser.street = data.street;
                this.orderUser.city = data.city.label;

                // This will make sure that there will be no reference
                const clonedOrderUser = cloneDeep(this.orderUser);

                this.$store.commit('Order/updateOrderUser', clonedOrderUser);
            });
        }

        public updateOrderUser(field: string) {
            switch (field) {
                case fieldsEnum.FIRSTNAME:
                case fieldsEnum.LASTNAME:
                    this.fieldsValidation.string(field, this.orderUser[field], 2, 100);
                    break;
                case fieldsEnum.ZIPCODE:
                    this.fieldsValidation.string(field, this.orderUser[field], 6, 6);
                    break;
                case fieldsEnum.STREETNUMBER:
                    this.fieldsValidation.string(field, this.orderUser[field], 1, 6);
                    break;
                case fieldsEnum.PHONE:
                    this.fieldsValidation.phone(field, this.orderUser[field]);
                    break;
                case fieldsEnum.EMAIL:
                    this.fieldsValidation.email(field, this.orderUser[field]);
                    break;
            }

            // Don't do anything whenever we got errors...
            if (this.fieldsValidation.hasErrors()) {
                return;
            }

            // This will make sure that there will be no reference
            const clonedOrderUser = cloneDeep(this.orderUser);

            this.$store.commit('Order/updateOrderUser', clonedOrderUser);
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

        public selectPayment(paymentMethod) {
            this.selectedPaymentMethod = paymentMethod;
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