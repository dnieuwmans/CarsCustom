<template>
    <div class="order-car">
        <main-nav/>

        <div v-if="order != null">
            <header class="order-car-header">
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
                        <p><strong>Note:</strong> clicking on a color will actually changes the color of the shown car,
                            try
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

                    <div class="order-panel col" v-if="order.activeStep === stepsEnum.ACCESSORY"
                         :key="stepsEnum.ACCESSORY">
                        <h2>Select Accessories</h2>
                        <div class="alert alert-warning">This section is under construction</div>
                    </div>

                    <div class="order-panel col" v-if="order.activeStep === stepsEnum.USER_INFO"
                         :key="stepsEnum.USER_INFO">
                        <h2>User information</h2>

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
                                       v-model="orderUser.firstName" @change="updateOrderUser(fieldsEnum.FIRSTNAME)"
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
                                <p id="address" style="margin-top: 0.375rem; color: rgba(0,0,0,0.5)"> <!-- TODO: get rid of the inline style -->
                                    <em v-text="`${orderUser.street} ${orderUser.streetNumber}, ${orderUser.city}`" v-if="orderUser.city !== ''"></em>
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

                    <div class="order-panel col" v-if="order.activeStep === stepsEnum.SUMMARY" :key="stepsEnum.SUMMARY">
                        <h2>Summary</h2>
                        <p>We are almost there! Please verify your order before continue.</p>

                        <div class="row">
                            <div class="col">
                                <h5>Your Order</h5>
                                <hr>

                                <p>
                                    <Strong>Car:</Strong> <br/>
                                    <span>{{ order.selectedCar.brand }} {{ order.selectedCar.type }}</span> - <em>{{
                                    order.selectedCar.description }}</em>
                                </p>
                                <p>
                                    <strong>Selected color:</strong> {{ order.selectedColorObject }} <br>
                                    <strong>Selected Accessories</strong>
                                </p>
                                <p><em>Nothing selected.</em></p>
                                <!--<ul>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Deserunt eligendi et illo ipsa.</li>
                                    <li>Aliquid commodi cumque porro soluta?</li>
                                    <li>Animi eveniet neque voluptas voluptates!</li>
                                    <li>Architecto incidunt odio vero voluptas.</li>
                                </ul>-->
                            </div>

                            <div class="col">
                                <h5>User Information</h5>
                                <hr>

                                <p>
                                    <strong>Name:</strong> {{ order.orderUser.firstName }} {{ order.orderUser.lastName }} <br>
                                    <strong>Address:</strong> {{ order.orderUser.street }} {{ order.orderUser.streetNumber }}, {{ order.orderUser.city }} - {{ order.orderUser.zipCode }}<br>
                                    <strong>Phone:</strong> {{ order.orderUser.phone }} <br>
                                    <strong>Email:</strong> {{ order.orderUser.email }}
                                </p>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <order-bar
                    :order="order"
                    :validation="fieldsValidation"
                    @order-bar:next="nextStep()"
                    @order-bar:previous="previousStep()"
                    @order-bar:next-from-user="continueToSummary()"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';
    import { stepsEnum } from '../../models/Order';
    import OrderBar from "./components/OrderBar.vue";
    import OrderUser from "../../models/OrderUser";
    import { cloneDeep } from 'lodash';
    import Validation from "../../utils/Validation";
    import AddressApi from "../../api/AddressApi";

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

            // Remap the items and remove any references if they are there.
            this.orderUser = cloneDeep(this.order.orderUser);
            this.fieldsValidation = new Validation(cloneDeep(this.order.orderUser));
        }

        public selectColor(key: number) {
            this.$store.commit('Order/setSelectedColor', key);
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

            if(zipCode === '' || streetNumber === '') {
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
            if(this.fieldsValidation.hasError(fieldsEnum.ZIPCODE) || this.fieldsValidation.hasError(fieldsEnum.STREETNUMBER)) {
                return;
            }

            AddressApi.getAddress(zipCode, parsedStreetNumber).then((response) => {
                let data = response.data._embedded.addresses[0];

                this.orderUser.street = data.street;
                this.orderUser.city = data.city.label;

                // This will make sure that there will be no reference
                const clonedOrderUser = cloneDeep(this.orderUser);

                this.$store.commit('Order/updateOrderUser', clonedOrderUser);
            });
        }

        public updateOrderUser(field: string) {
            switch(field) {
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
            if(this.fieldsValidation.hasErrors()) {
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
            if(this.fieldsValidation.hasErrors()) {
                return;
            }

            this.$store.commit('Order/nextStep');
        }
    }
</script>