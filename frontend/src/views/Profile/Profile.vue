<template>
    <div class="profile">
        <main-nav/>

        <div class="profile-wrapper" :class="{ 'sidebar--open': sidebarOpen }" @click="closeSidebar()">
            <div class="profile-info" :class="{ 'profile-info--open': sidebarOpen }">
                <div class="profile-info-card">
                    <div class="profile-avatar">
                        <i class="fal fa-user"></i>
                        <h6>{{ $auth.user.fullName}}</h6>
                    </div>
                    <div class="user-info">
                        <ul>
                            <li>
                                <i class="fal fa-fw fa-id-card-alt" title="Username"></i>
                                <span>{{ $auth.user.username }}</span>
                            </li>
                            <li>
                                <i class="fal fa-fw fa-envelope" title="Email"></i>
                                <span>{{ $auth.user.email }}</span>
                            </li>
                            <li>
                                <i class="fal fa-fw fa-mobile-android" title="Phone"></i>
                                <span>{{ $auth.user.phone }}</span>
                            </li>
                            <li>
                                <i class="fal fa-fw fa-map-marker-alt" title="Address"></i>
                                <span>{{ $auth.user.address}}</span>
                            </li>
                            <li>
                                <button class="btn btn-profile-edit btn-block" @click="editUser()">Edit</button>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <!-- TODO: IF we got time we should add user information change and open the order in this window instead of the one with the token-->
            <div class="profile-container box">
                <div class="profile-container__title">
                    <h3>My Profile</h3>
                    <h5>{{ title }}</h5>
                </div>

                <router-view />
            </div>
        </div>

        <!-- Mobile! -->
        <!-- TODO: make a component -->
        <div class="mobile-navigator">
            <ul class="navigator-items">
                <li :class="{'active': sidebarOpen }">
                    <a href="#" @click.prevent.stop="toggleSideBar()">
                        <i class="fal fa-user"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import MainNav from '@/components/MainNav.vue';

    @Component({
        name: 'Profile',
        components: {
            MainNav,
        }
    })
    export default class Profile extends Vue {
        public sidebarOpen: boolean = false;

        get title() {
            return this.$route.meta.title;
        }

        public mounted() {
            // Extra check when you are not loggedIn
            if (this.$auth.user == null) {
                this.$router.push({name: 'home'});
                return;
            }
        }

        public toggleSideBar() {
            this.sidebarOpen = !this.sidebarOpen;
        }

        public closeSidebar() {
            if (this.sidebarOpen) {
                this.sidebarOpen = false;
            }
        }

        public editUser() {
            this.$router.push({ name: 'profile:edit-user'});
            this.sidebarOpen = false;
        }
    }
</script>