<template>
    <div class="edit-user">
        <router-link :to="{name: 'profile:orders'}">
            <i class="fal fa-chevron-left"></i>
            <span>Back to profile</span>
        </router-link>

        <div class="mt-4">
            <div class="alert alert-success mb-4" v-if="showSuccessMessage">{{ successMessage }}</div>

            <div v-if="fieldsValidation != null">
                <user-form-profile :fields-validation="fieldsValidation" :user="user"/>
            </div>
        
        
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary"
                    @click="save()">Save</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import MainNav from '@/components/MainNav.vue';

    import Api from '@/api/Api';
    import Car from '@/models/Car';
    import { cloneDeep } from 'lodash';
    import {Order} from '@/models/Order';
    import User from "@/models/User";
    import UserFormProfile from "@/components/UserFormProfile.vue";
    import userFieldsEnum from "@/utils/UserFieldsEnum";
    import Validation from "@/utils/Validation";

    @Component({
        name: 'SingleOrder',
        components: {
            MainNav,
            UserFormProfile,
        }
    })
    export default class SingleOrder extends Vue {
        // @ts-ignore
        public fieldsEnum = userFieldsEnum;
        // @ts-ignore
        public user: User = cloneDeep(this.$auth.user);
        public fieldsValidation: Validation = new Validation({});
        public successMessage: string = '';
        public showSuccessMessage: boolean = false;

        public mounted() {
            this.fieldsValidation = new Validation(cloneDeep(this.user));
        }

        public save() {
            this.showSuccessMessage = false;

            // Recheck the fields
            this.recheckFields(this.user)
            
            // Don't do anything whenever we got errors...
            if(this.fieldsValidation.hasErrors()) {
                return;
            }
            
            Api.user.update(this.user)
            .then((response) => {
                this.showSuccessMessage = true;
                this.successMessage = "Success! Your profile information has been updated";

                this.$auth.refresh();
            })
            .catch((error) => {
                this.fieldsValidation.showErrors(error);
            })
        }

        private recheckFields(user: User) {
            if (user == null) return;

            this.fieldsValidation.string(this.fieldsEnum.FIRSTNAME, this.user[this.fieldsEnum.FIRSTNAME], 2, 100);
            this.fieldsValidation.string(this.fieldsEnum.LASTNAME, this.user[this.fieldsEnum.LASTNAME], 2, 100);
            this.fieldsValidation.string(this.fieldsEnum.ZIPCODE, this.user[this.fieldsEnum.ZIPCODE], 6, 6);
            this.fieldsValidation.string(this.fieldsEnum.STREETNUMBER, this.user[this.fieldsEnum.STREETNUMBER], 1, 6);
            this.fieldsValidation.phone(this.fieldsEnum.PHONE, this.user[this.fieldsEnum.PHONE]);
            this.fieldsValidation.email(this.fieldsEnum.EMAIL, this.user[this.fieldsEnum.EMAIL]);
        }
    }
</script>