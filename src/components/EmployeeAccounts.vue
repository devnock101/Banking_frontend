<template>
  <div class="user_accounts">
    <b-card
      class="users"
      header="Employee Accounts"
      header-bg-variant="dark"
      header-text-variant="light"
      no-body
    >
      <b-tabs card pills content-class="mt-3">
        <b-tab title="View Accounts" active>
          <b-table
            ref="table"
            class="table"
            striped
            outlined
            hover
            responsive
            :current-page="currentPage"
            :per-page="perPage"
            :fields="updateField()"
            :items="accounts"
            @row-clicked="loadAccount"
          >
            <template slot="Modify" slot-scope="data">
              <b-link
                :to="{name: 'create', params: { action: 'employee_mod', user: 'ROLE_ADMIN', userid: data.item.userid}}"
              >
                <b-button variant="primary">Modify</b-button>
              </b-link>
            </template>
            <template slot="Delete" slot-scope="data">
              <b-button variant="primary" @click="accDelete(data.index)">Delete</b-button>
            </template>
          </b-table>
          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
                class="my-0"
              />
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Add Employee">
          <User :users="this.users" :id="null"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import User from "@/components/UserForm.vue";

export default {
  name: "user_accounts",
  mounted: function() {
    this.getUsers();
  },
  components: {
    User
  },
  data: function() {
    return {
      isBusy: false,
      action: "employee",
      user: "ROLE_ADMIN",
      users: ["ROLE_TIER1", "ROLE_TIER2"],
      perPage: 8,
      currentPage: 1,
      totalRows: "",
      accounts: [
        {
          isActive: true,
          user_id: 1,
          age: 40,
          usertypeid: "ROLE_TIER2",
          first_name: "Dickerson",
          last_name: "Macdonald"
        }
      ]
    };
  },
  methods: {
    getUsers: function() {
      this.toggleBusy();
      let accountList = process.env.VUE_APP_EMPLY_LIST;
      this.axios.get(accountList).then(response => {
        this.accounts = response.data;
        this.totalRows = this.accounts.length;
      });
      // this.$refs.table.refresh();
      this.toggleBusy();
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    accDelete: function(i) {
      let temp = i + ((this.currentPage - 1) * this.perPage);
      let id = this.accounts[temp].userid;
      this.accounts.splice(temp, 1);
      // console.log(id);
      let deleteUrl = process.env.VUE_APP_USER + "/employees/" + id;
      this.axios.delete(deleteUrl);
      // this.$refs.table.refresh();
    },
    updateField: function() {
      var field = Object.keys(this.accounts[0]);
      field.push("Modify", "Delete");
      // field.push("Delete");
      return field;
    },
    loadAccount: function(item) {
        this.$router.push({
        name: "account",
        params: { userid: item.userid, usertype: this.user }
      });
    }
  }
};
</script>

<style scoped>
.accounts {
  max-height: 25%;
  overflow: scroll;
}
.users {
  margin: 5% auto;
}
.btn {
  margin: 0px 10px 20px;
}
table.b-table[aria-busy="false"] {
  opacity: 1;
}
table.b-table[aria-busy="true"] {
  opacity: 0.6;
}
</style>
