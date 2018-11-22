<template>
    <div class="explore-cars">
        <main-nav/>
        <div class="registration-complete container">
            <div class="row">
                <div class="col">
                    <p class="text-center"><i class="far fa-check-circle fa-10x"></i></p>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <h1>Registration complete</h1>
                    <h5>Please login with your username and password</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MainNav from '../../components/MainNav.vue';

    @Component({
        name: 'RegistrationComplete',
        components: {
            MainNav,
        }
    })
    export default class RegistrationComplete extends Vue {
        main
    }
</script>