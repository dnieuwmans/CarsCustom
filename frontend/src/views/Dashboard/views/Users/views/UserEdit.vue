<template>
    <div class="new-user">
        <div class="alert alert-danger mb-4" v-if="showErrorMessage">{{ errorMessage }}</div>
        <user-form :fields-validation="fieldsValidation" :user="user" v-if="fieldsValidation != null" />

        <div class="row">
            <div class="col">
                <button class="btn btn-primary"
                        @click="">Update user</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '@/components/MainNav.vue';
    import User from "@/models/User";
    import { cloneDeep } from 'lodash';
    import Validation from "@/utils/Validation";
    import Api from "@/api/Api";
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
        public continueOrderModal: boolean = false;
        public fieldsEnum = userFieldsEnum;
        public user = User.init(); // Because we are lazy ;)
        public fieldsValidation: Validation = new Validation({});
        public errorMessage: string = '';
        public showErrorMessage: boolean = false;

        public mounted() {
            // Check if we got an id
            const id = this.$route.params.id;

            if (id == null) {
                this.$router.go(-1);
                return;
            }

            this.fieldsValidation = new Validation(cloneDeep(this.user));

            // TODO: load user info
            Api.user.getUser(parseInt(id)).then((response) => {
                this.user = User.fromJson(response.data);
            });
        }

        public update() {
            // // Recheck the fields
            // this.recheckFields(this.user);
            //
            // // Don't do anything whenever we got errors...
            // if(this.fieldsValidation.hasErrors()) {
            //     return;
            // }
            //
            // Api.auth.register(this.user)
            //     .then((response) => {
            //         // TODO SJOERD, tell the user the new user has been added to the database.
            //
            //         this.emptyFields();
            //         return;
            //     })
            //     .catch((error) => {
            //         this.showErrorMessage = true;
            //         this.errorMessage = error.response.data;
            //     })
        }

        private recheckFields(user: User) {
            this.fieldsValidation.string(this.fieldsEnum.USERNAME, this.user[this.fieldsEnum.USERNAME], 2, 100);
            this.fieldsValidation.userName(this.fieldsEnum.USERNAME, this.user[this.fieldsEnum.USERNAME]);
            this.fieldsValidation.string(this.fieldsEnum.PASSWORD, this.user[this.fieldsEnum.PASSWORD], 8, 100);
            this.fieldsValidation.string(this.fieldsEnum.CONFIRMPASSWORD, this.user[this.fieldsEnum.CONFIRMPASSWORD], 8, 100);

            // @ts-ignore
            // TODO: somehow the role doesn't work properly with ts
            this.fieldsValidation.role(this.fieldsEnum.ROLE, this.user[this.fieldsEnum.ROLE]);
            this.fieldsValidation.confirmPassword(this.fieldsEnum.CONFIRMPASSWORD, this.user[this.fieldsEnum.PASSWORD], this.user[this.fieldsEnum.CONFIRMPASSWORD]);
            this.fieldsValidation.string(this.fieldsEnum.FIRSTNAME, this.user[this.fieldsEnum.FIRSTNAME], 2, 100);
            this.fieldsValidation.string(this.fieldsEnum.LASTNAME, this.user[this.fieldsEnum.LASTNAME], 2, 100);
            this.fieldsValidation.string(this.fieldsEnum.ZIPCODE, this.user[this.fieldsEnum.ZIPCODE], 6, 6);
            this.fieldsValidation.string(this.fieldsEnum.STREETNUMBER, this.user[this.fieldsEnum.STREETNUMBER], 1, 6);
            this.fieldsValidation.phone(this.fieldsEnum.PHONE, this.user[this.fieldsEnum.PHONE]);
            this.fieldsValidation.email(this.fieldsEnum.EMAIL, this.user[this.fieldsEnum.EMAIL]);
        }

        private emptyFields() {
            this.user[this.fieldsEnum.USERNAME] = '';
            this.user[this.fieldsEnum.USERNAME] = '';
            this.user[this.fieldsEnum.PASSWORD] = '';
            this.user[this.fieldsEnum.CONFIRMPASSWORD] = '';
            this.user[this.fieldsEnum.ROLE] = 0;
            this.user[this.fieldsEnum.PASSWORD] = '';
            this.user[this.fieldsEnum.FIRSTNAME] = '';
            this.user[this.fieldsEnum.LASTNAME] = '';
            this.user[this.fieldsEnum.ZIPCODE] = '';
            this.user[this.fieldsEnum.STREETNUMBER] = '';
            this.user[this.fieldsEnum.PHONE] = '';
            this.user[this.fieldsEnum.EMAIL] = '';
        }
    }
</script>
