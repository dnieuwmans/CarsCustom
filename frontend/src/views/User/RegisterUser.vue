<template>
    <div class="explore-cars">
        <main-nav/>
        <div class="register-user container">
            <div class="alert alert-danger mb-4" v-if="showErrorMessage">{{ errorMessage }}</div>
            <!-- Main -->
            <h2>Register</h2>
            <div v-if="fieldsValidation != null">
                <div class="row">
                    <div class="col form-group">
                        <label for="username">Username</label>
                        <!-- TODO: make component-->
                        <input type="text"
                                id="username"
                                class="form-control"
                                placeholder="User"
                                :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.USERNAME)}"
                                v-model="user.username"
                        >
                        <div class="invalid-feedback"
                                v-text="fieldsValidation.errors[fieldsEnum.USERNAME]"
                                v-if="fieldsValidation.hasError(fieldsEnum.USERNAME)"
                        ></div>
                    </div>
                    <div class="col form-group">
                        <label for="email">Email</label>
                        <input type="text"
                                id="email"
                                class="form-control"
                                :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.EMAIL)}"
                                placeholder="john.doe@email.com"
                                v-model="user.email"
                        >
                        <div class="invalid-feedback"
                                v-text="fieldsValidation.errors[fieldsEnum.EMAIL]"
                                v-if="fieldsValidation.hasError(fieldsEnum.EMAIL)"
                        ></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                class="form-control"
                                placeholder="********"
                                :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.PASSWORD)}"
                                v-model="user.password"
                        >
                        <div class="invalid-feedback"
                                v-text="fieldsValidation.errors[fieldsEnum.PASSWORD]"
                                v-if="fieldsValidation.hasError(fieldsEnum.PASSWORD)"
                        ></div>
                    </div>
                    <div class="col form-group">
                        <label for="confirmPassword">Confirm password</label>
                        <input
                                type="password"
                                id="confirmPassword"
                                class="form-control"
                                placeholder="********"
                                v-model="user.confirmPassword"
                                :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.CONFIRMPASSWORD)}"
                        >
                        <div class="invalid-feedback"
                                v-text="fieldsValidation.errors[fieldsEnum.CONFIRMPASSWORD]"
                                v-if="fieldsValidation.hasError(fieldsEnum.CONFIRMPASSWORD)"
                        ></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="first-name">First Name</label>
                        <!-- TODO: make component-->
                        <input type="text"
                                id="first-name"
                                class="form-control"
                                placeholder="John"
                                v-model="user.firstName"
                                :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.FIRSTNAME)}"
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
                                v-model="user.lastName"
                                :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.LASTNAME)}"
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
                                v-model="user.zipCode"
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
                                v-model="user.streetNumber"
                                @change="updateAddress()"
                        >
                        <div class="invalid-feedback"
                                v-text="fieldsValidation.errors[fieldsEnum.STREETNUMBER]"
                                v-if="fieldsValidation.hasError(fieldsEnum.STREETNUMBER)"
                        ></div>
                    </div>
                    <div class="col">
                        <label for="address">Address <i class="fas fa-info-circle"></i></label>
                        <p id="address" style="margin-top: 0.375rem; color: rgba(0,0,0,0.5)"> <!-- TODO: get rid of the inline style -->
                            <em v-text="`${user.street} ${user.streetNumber}, ${user.city}`" v-if="user.city !== ''"></em>
                        </p>
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
                                v-model="user.phone"
                        >
                        <div class="invalid-feedback"
                                v-text="fieldsValidation.errors[fieldsEnum.PHONE]"
                                v-if="fieldsValidation.hasError(fieldsEnum.PHONE)"
                        ></div>
                    </div>
                    <div class="col" />
                </div>
                <div class="row">
                    <div class="col">
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-primary"
                        @click="register()">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';
    import User from "../../models/User";
    import { cloneDeep } from 'lodash';
    import Validation from "../../utils/Validation";
    import Api from "../../api/Api";

    enum fieldsEnum {
        USERNAME = 'username',
        PASSWORD = 'password',
        CONFIRMPASSWORD = 'confirmPassword',
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
        name: 'RegisterUser',
        components: {
            MainNav,
        }
    })
    export default class RegisterUser extends Vue {
        public continueOrderModal: boolean = false;
        public fieldsEnum = fieldsEnum;
        public user = User.init(); // Because we are lazy ;)
        public fieldsValidation: Validation = new Validation({});
        public errorMessage: string = '';
        public showErrorMessage: boolean = false;

        public mounted() {
            this.fieldsValidation = new Validation(cloneDeep(this.user));
        }

        public updateAddress() {
            const zipCode = this.user.zipCode;
            const streetNumber = this.user.streetNumber;

            if(zipCode === '' || streetNumber === '') {
                this.validateUser(fieldsEnum.ZIPCODE);
                this.validateUser(fieldsEnum.STREETNUMBER);

                return;
            }

            const parsedStreetNumber = Number.parseInt(streetNumber, 10);

            // Checks if the number is actually a number.
            if (Number.isNaN(parsedStreetNumber)) {
                return;
            }

            // Let's check again.
            this.validateUser(fieldsEnum.ZIPCODE);
            this.validateUser(fieldsEnum.STREETNUMBER);

            // We may not have any errors
            if(this.fieldsValidation.hasError(fieldsEnum.ZIPCODE) || this.fieldsValidation.hasError(fieldsEnum.STREETNUMBER)) {
                return;
            }

            Api.address.getAddress(zipCode, parsedStreetNumber).then((response) => {
                let data = response.data._embedded.addresses[0];

                this.user.street = data.street;
                this.user.city = data.city.label;
            });
        }

        public register() {
            // Recheck the fields
            this.recheckFields(this.user)
            
            // Don't do anything whenever we got errors...
            if(this.fieldsValidation.hasErrors()) {
                return;
            }
            
            Api.auth.register(this.user)
            .then((response) => {
                 this.$router.push({ name: 'registration-complete'});
                 return;
            })
            .catch((error) => {
                this.showErrorMessage = true;
                this.errorMessage = error.response.data;
            })
        }

        private recheckFields(user: User) {
            this.fieldsValidation.string(fieldsEnum.USERNAME, this.user[fieldsEnum.USERNAME], 2, 100);
            this.fieldsValidation.userName(fieldsEnum.USERNAME, this.user[fieldsEnum.USERNAME]);
            this.fieldsValidation.string(fieldsEnum.PASSWORD, this.user[fieldsEnum.PASSWORD], 8, 100);
            this.fieldsValidation.string(fieldsEnum.CONFIRMPASSWORD, this.user[fieldsEnum.CONFIRMPASSWORD], 8, 100);
            this.fieldsValidation.confirmPassword(fieldsEnum.CONFIRMPASSWORD, this.user[fieldsEnum.PASSWORD], this.user[fieldsEnum.CONFIRMPASSWORD]);
            this.fieldsValidation.string(fieldsEnum.FIRSTNAME, this.user[fieldsEnum.FIRSTNAME], 2, 100);
            this.fieldsValidation.string(fieldsEnum.LASTNAME, this.user[fieldsEnum.LASTNAME], 2, 100);
            this.fieldsValidation.string(fieldsEnum.ZIPCODE, this.user[fieldsEnum.ZIPCODE], 6, 6);
            this.fieldsValidation.string(fieldsEnum.STREETNUMBER, this.user[fieldsEnum.STREETNUMBER], 1, 6);
            this.fieldsValidation.phone(fieldsEnum.PHONE, this.user[fieldsEnum.PHONE]);
            this.fieldsValidation.email(fieldsEnum.EMAIL, this.user[fieldsEnum.EMAIL]);
        }

        public validateUser(field: string) {
            switch(field) {
                case fieldsEnum.PASSWORD:
                case fieldsEnum.CONFIRMPASSWORD:
                    this.fieldsValidation.string(field, this.user[field], 8, 100);
                case fieldsEnum.USERNAME:
                case fieldsEnum.FIRSTNAME:
                case fieldsEnum.LASTNAME:
                    this.fieldsValidation.string(field, this.user[field], 2, 100);
                    break;
                case fieldsEnum.ZIPCODE:
                    this.fieldsValidation.string(field, this.user[field], 6, 6);
                    break;
                case fieldsEnum.STREETNUMBER:
                    this.fieldsValidation.string(field, this.user[field], 1, 6);
                    break;
                case fieldsEnum.PHONE:
                    this.fieldsValidation.phone(field, this.user[field]);
                    break;
                case fieldsEnum.EMAIL:
                    this.fieldsValidation.email(field, this.user[field]);
                    break;
            }

            if(this.fieldsValidation.hasErrors()) {
                return;
            }
        }
    }
</script>