<template>
    <div>
        <h5>Overview</h5>

        <table class="table dashboard-table">
            <thead>
            <tr>
                <th>Full name</th>
                <th>Username</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in orderedUsers" :key="user.id" :class="{ 'item-disabled' : user.disabled }">
                <td v-text="user.fullName"></td>
                <td v-text="user.username"></td>
                <td v-text="user.address"></td>
                <td v-text="user.phone"></td>
                <td><a :href="`mailto: ${user.email}`">{{ user.fullName }}</a></td>
                <td v-text="getRoleName(user.role)"></td>
                <td>
                    <i v-if="user.disabled" class="fal fa-times"></i>
                    <i v-else class="fal fa-check"></i>
                </td>
                <td class="actions">
                    <row-action>
                        <ul slot="content">
                            <li>
                                <a href="#" @click.prevent="toggleDisabled(user)">
                                    <i class="fal fa-fw" :class="user.disabled ? 'fa-check' : 'fa-times'"></i>
                                    <span v-text="user.disabled ? 'Enable' : 'Disable'"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fal fa-fw fa-pen"></i>
                                    <span>Edit</span>
                                </a>
                            </li>
                        </ul>
                    </row-action>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Api from "@/api/Api";
    import User from "@/models/User";
    import {getRoleName} from "@/utils/Roles";
    import RowAction from "../../../components/RowAction.vue";

    @Component({
        components: {RowAction}
    })

    export default class DashboardUsersOverview extends Vue {
        public users: User[] = [];
        public getRoleName = getRoleName;

        get orderedUsers() {
            return this.users.sort((a, b) => {
                if (a.disabled < b.disabled) {
                    return -1;
                }

                if (a.disabled > b.disabled) {
                    return 1;
                }

                return 0;
            })
        }

        mounted() {
            Api.user.getUsers().then(response => {
                this.users = response.data.map(User.fromJson);
            });
        }

        public toggleDisabled(user: User) {
            // Let's update the disabled property of the user.
            Api.user.updateDisabled(user).then((response) => {
                if (response.data) {
                    user.disabled = !user.disabled;
                }
            })
        }
    }
</script>
