<template>
    <div>

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

@Component({
    name: 'UserFormProfile',
})
export default class UserForm extends Vue {
    public fieldsEnum = UserFieldsEnum;

    @Prop()
    public user!: User;

    @Prop()
    public fieldsValidation!: Validation;

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
