<template>
    <footer>
        <main-logo class="footer-logo"/>
        <small>&copy; {{ year }} CarsCustom. CarsCustom is a fictional company, we actually don't sell cars :)</small>
    </footer>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MainLogo from '@/components/MainLogo.vue';

    @Component({
        name: 'MainFooter',
        components: {
            MainLogo,
        }
    })
    export default class MainFooter extends Vue {
        get year() {
            return new Date().getFullYear();
        }
    }
</script>