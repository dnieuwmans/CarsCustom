<template>
    <div>
        <div class="row">
            <div class="col form-group">
                <label for="username">Username</label>
                <input type="text"
                        id="username"
                        class="form-control"
                        placeholder="User"
                        :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.USERNAME)}"
                        v-model="user.username"
                        @change="validateUser(fieldsEnum.USERNAME)"
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
                        @change="validateUser(fieldsEnum.EMAIL)"
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
                        @change="validateUser(fieldsEnum.PASSWORD)"
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
                        @change="validateUser(fieldsEnum.CONFIRMPASSWORD)"
                >
                <div class="invalid-feedback"
                        v-text="fieldsValidation.errors[fieldsEnum.CONFIRMPASSWORD]"
                        v-if="fieldsValidation.hasError(fieldsEnum.CONFIRMPASSWORD)"
                ></div>
            </div>    
        </div>
        <!-- if route is dashboard new user then show role dropdown -->
        <div v-if="$route.path === '/dashboard/users/new'" class="row">
            <div class="col form-group">
                <label for="role">Role</label>
                <select class="form-control" v-model="user.role" :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.ROLE)}">
                     <option v-for="role in roles" :key="role.key"> {{ role.value }} </option>
                </select>
                <div class="invalid-feedback"
                        v-text="fieldsValidation.errors[fieldsEnum.ROLE]"
                        v-if="fieldsValidation.hasError(fieldsEnum.ROLE)"
                ></div>
            </div>
            <div class="col"></div>
        </div>

        <div class="row">
            <div class="col">
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col form-group">
                <label for="first-name">First Name</label>
                <input type="text"
                        id="first-name"
                        class="form-control"
                        placeholder="John"
                        v-model="user.firstName"
                        :class="{'is-invalid': fieldsValidation.hasError(fieldsEnum.FIRSTNAME)}"
                        @change="validateUser(fieldsEnum.FIRSTNAME)"
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
                        @change="validateUser(fieldsEnum.LASTNAME)"
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
                        @change="validateUser(fieldsEnum.PHONE)"
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
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import Validation from "@/utils/Validation";
import User from "@/models/User";
import Api from "@/api/Api";
import UserFieldsEnum from "@/utils/UserFieldsEnum";
import {roleEnum} from "@/utils/Roles";

@Component({
    name: 'UserForm',
})
export default class UserForm extends Vue {
    public fieldsEnum = UserFieldsEnum;

    @Prop()
    public user!: User;

    @Prop()
    public fieldsValidation!: Validation;

    get roles() {
        const roles = [];

        for(let key in roleEnum) {
            let numberKey = Number.parseInt(key);

            if (!isNaN(numberKey)) {
                const value = roleEnum[numberKey].substring(0,1) + roleEnum[numberKey].substring(1).toLowerCase();

                roles.push({ key: numberKey, value, }
                );
            }
        }

        if(this.$auth.isEmployee()) {
            roles.splice(0,2);
        }

        return roles;
    }

    public updateAddress() {
        const zipCode = this.user.zipCode;
        const streetNumber = this.user.streetNumber;

        if(zipCode === '' || streetNumber === '') {
            this.validateUser(this.fieldsEnum.ZIPCODE);
            this.validateUser(this.fieldsEnum.STREETNUMBER);

            return;
        }

        const parsedStreetNumber = Number.parseInt(streetNumber, 10);

        // Checks if the number is actually a number.
        if (Number.isNaN(parsedStreetNumber)) {
            return;
        }

        // Let's check again.
        this.validateUser(this.fieldsEnum.ZIPCODE);
        this.validateUser(this.fieldsEnum.STREETNUMBER);

        // We may not have any errors
        if(this.fieldsValidation.hasError(this.fieldsEnum.ZIPCODE) || this.fieldsValidation.hasError(this.fieldsEnum.STREETNUMBER)) {
            return;
        }

        Api.address.getAddress(zipCode, parsedStreetNumber).then((response) => {
            let data = response.data._embedded.addresses[0];

            this.user.street = data.street;
            this.user.city = data.city.label;
        });
    }

    public validateUser(field: string) {
        switch(field) {
            case this.fieldsEnum.PASSWORD:
            case this.fieldsEnum.CONFIRMPASSWORD:
                this.fieldsValidation.string(field, this.user[field], 8, 100);
                break;
            case this.fieldsEnum.USERNAME:
                this.fieldsValidation.userName(field, this.user[field]);
                break;
            case this.fieldsEnum.FIRSTNAME:
            case this.fieldsEnum.LASTNAME:
                this.fieldsValidation.string(field, this.user[field], 2, 100);
                break;
            case this.fieldsEnum.ZIPCODE:
                this.fieldsValidation.string(field, this.user[field], 6, 6);
                break;
            case this.fieldsEnum.STREETNUMBER:
                this.fieldsValidation.string(field, this.user[field], 1, 6);
                break;
            case this.fieldsEnum.PHONE:
                this.fieldsValidation.phone(field, this.user[field]);
                break;
            case this.fieldsEnum.EMAIL:
                this.fieldsValidation.email(field, this.user[field]);
                break;
        }
    }
}
</script>
