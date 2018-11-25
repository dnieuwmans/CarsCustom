<template>
    <nav class="main-nav">
        <div class="container-fluid">
            <div class="row">
                <div class="col logo logo--white logo--smaller">
                    <main-logo/>
                </div>

                <main-menu />
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MainLogo from '@/components/MainLogo.vue';
    import MainMenu from '@/components/MainMenu.vue';

    @Component({
        name: 'MainNav',
        components: {
            MainLogo,
            MainMenu,
        }
    })
    export default class MainNav extends Vue {}
</script>