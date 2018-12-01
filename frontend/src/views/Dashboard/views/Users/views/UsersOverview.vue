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
                <tr v-for="user in users" :key="user.id">
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
                        <a href="#"><i class="far fa-ellipsis-h"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/api/Api";
import User from "@/models/User";
import { getRoleName } from "@/utils/Roles";

@Component({})

export default class DashboardUsersOverview extends Vue {
  public users: [User] = null;
  public getRoleName = getRoleName;

  mounted() {
    Api.user.getUsers().then(response => {
      this.users = response.data.map(User.fromJson);
      console.log(this.users);
    });
  }
}
</script>
