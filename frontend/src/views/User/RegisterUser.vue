<template>
    <div class="register-user">
        <main-nav/>
        <div class="container">
            <div class="alert alert-danger mb-4" v-if="showErrorMessage">{{ errorMessage }}</div>

            <!-- Main -->
            <h2>Register</h2>
            <div v-if="fieldsValidation != null">
                <user-form :fields-validation="fieldsValidation" :user="user" />
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
    import UserForm from "@/components/UserForm";
    import userFieldsEnum from "@/utils/UserFieldsEnum";

    @Component({
        name: 'RegisterUser',
        components: {
            MainNav,
            UserForm,
        }
    })
    export default class RegisterUser extends Vue {
        public continueOrderModal: boolean = false;
        public fieldsEnum = userFieldsEnum;
        public user = User.init(); // Because we are lazy ;)
        public fieldsValidation: Validation = new Validation({});
        public errorMessage: string = '';
        public showErrorMessage: boolean = false;

        public mounted() {
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
    }
</script>