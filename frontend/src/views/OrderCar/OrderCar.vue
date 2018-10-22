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

                        <div class="row">
                            <div class="col form-group">
                                <label for="first-name">First Name</label>
                                <input type="text" id="first-name" class="form-control" v-model="orderUser.firstName" @change="updateOrderUser()">
                            </div>
                            <div class="col form-group">
                                <label for="last-name">Last Name</label>
                                <input type="text" id="last-name" class="form-control" v-model="orderUser.lastName" @change="updateOrderUser()">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col form-group">
                                <label for="address">Address
                                    <small>(Street name and number)</small>
                                </label>
                                <input type="text" id="address" class="form-control" v-model="orderUser.address" @change="updateOrderUser()">
                            </div>
                            <div class="col form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" name="city" class="form-control" v-model="orderUser.city" @change="updateOrderUser()">
                            </div>
                            <div class="col form-group">
                                <label for="zip-code">Zip-code</label>
                                <input type="text" id="zip-code" class="form-control" v-model="orderUser.zipCode" @change="updateOrderUser()">
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
                                <input type="text" id="phone" class="form-control" v-model="orderUser.phone" @change="updateOrderUser()">
                            </div>
                            <div class="col form-group">
                                <label for="email">Email</label>
                                <input type="text" id="email" class="form-control" v-model="orderUser.email" @change="updateOrderUser()">
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

            <order-bar :order="order" @order-bar:next="nextStep()"
                       @order-bar:previous="previousStep()"></order-bar>
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
        public orderUser = OrderUser.init(); // Because we are lazy ;)

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

        public updateOrderUser() {
            // TODO: validation
            // This will make sure that there will be no reference
            const clonedOrderUser = cloneDeep(this.orderUser);

            this.$store.commit('Order/updateOrderUser', clonedOrderUser);
        }
    }
</script>