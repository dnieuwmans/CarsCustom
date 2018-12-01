<template>
    <div class="order-panel col">
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
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Api from "../../../../api/Api";
    import {cloneDeep} from 'lodash';
    import Validation from "../../../../utils/Validation";

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
        name: 'UserInfoStep',
        props: {
            orderUser: {
                type: Object,
                required: true,
            },

            fieldsValidation: {
                type: Validation,
                required: true,
            },

        }
    })
    export default class UserInfoStep extends Vue {
        public fieldsEnum = fieldsEnum;

        get order() {
            return this.$store.getters['Order/getOrder'];
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
    }
</script>