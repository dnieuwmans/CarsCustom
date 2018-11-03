<template>
    <nav class="main-nav">
        <div class="container-fluid">
            <div class="row">
                <div class="col logo logo--white logo--smaller">
                    <main-logo/>
                </div>

                <div class="header-nav__menu">
                    <ul class="list-unstyled">
                        <li :class="{'active': link.name === current}" v-for="link in links">
                            <router-link :to="{name: link.name}">{{ link.text }}</router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'user'}">
                                <i class="far fa-user"></i>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'order'}">
                                <i class="fal fa-shopping-basket"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import MainLogo from '@/components/MainLogo.vue';

    @Component({
        name: 'MainNav',
        components: {
            MainLogo,
        }
    })
    export default class MainNav extends Vue {
        public current: string = '';
        public links: object[] = [
            {
                name: 'home',
                text: 'Home',
            },
            {
                name: 'explore-cars',
                text: 'Explore Cars',
            },
        ];

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public mounted() {
            this.current = this.$route.name || '';
        }
    }
</script>