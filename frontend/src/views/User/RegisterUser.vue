<template>
    <div class="register-user">
        <main-nav/>
        <div class="container">

            <!-- Main -->
            <h2>Register</h2>
            <div v-if="fieldsValidation != null">
                <user-form :fields-validation="fieldsValidation" :user="user" :excluded-fields="excludedFields" />
            </div>

            <div class="row">
                <div class="col">
                    <button class="btn btn-primary"
                    @click="register()">Register</button>
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
    import UserForm from "@/components/UserForm.vue";
    import userFieldsEnum from "@/utils/UserFieldsEnum";

    @Component({
        name: 'RegisterUser',
        components: {
            MainNav,
            UserForm,
        }
    })
    export default class RegisterUser extends Vue {
        public fieldsEnum = userFieldsEnum;
        public user = User.init(); // Because we are lazy ;)
        public fieldsValidation: Validation = new Validation({});

        get excludedFields() {
            return [
                userFieldsEnum.ROLE,
            ]
        }

        public mounted() {
            if (this.$auth.user !== null) {
                this.$router.push({name: 'home'});
                return;
            }

            this.fieldsValidation = new Validation(cloneDeep(this.user));
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
                this.fieldsValidation.showErrors(error);
            })
        }

        private recheckFields(user: User) {
            this.fieldsValidation.string(this.fieldsEnum.USERNAME, this.user[this.fieldsEnum.USERNAME], 2, 100);
            this.fieldsValidation.userName(this.fieldsEnum.USERNAME, this.user[this.fieldsEnum.USERNAME]);
            this.fieldsValidation.string(this.fieldsEnum.PASSWORD, this.user[this.fieldsEnum.PASSWORD], 8, 100);
            this.fieldsValidation.string(this.fieldsEnum.CONFIRMPASSWORD, this.user[this.fieldsEnum.CONFIRMPASSWORD], 8, 100);
            this.fieldsValidation.confirmPassword(this.fieldsEnum.CONFIRMPASSWORD, this.user[this.fieldsEnum.PASSWORD], this.user[this.fieldsEnum.CONFIRMPASSWORD]);
            this.fieldsValidation.string(this.fieldsEnum.FIRSTNAME, this.user[this.fieldsEnum.FIRSTNAME], 2, 100);
            this.fieldsValidation.string(this.fieldsEnum.LASTNAME, this.user[this.fieldsEnum.LASTNAME], 2, 100);
            this.fieldsValidation.string(this.fieldsEnum.ZIPCODE, this.user[this.fieldsEnum.ZIPCODE], 6, 6);
            this.fieldsValidation.string(this.fieldsEnum.STREETNUMBER, this.user[this.fieldsEnum.STREETNUMBER], 1, 6);
            this.fieldsValidation.phone(this.fieldsEnum.PHONE, this.user[this.fieldsEnum.PHONE]);
            this.fieldsValidation.email(this.fieldsEnum.EMAIL, this.user[this.fieldsEnum.EMAIL]);
        }
    }
</script>