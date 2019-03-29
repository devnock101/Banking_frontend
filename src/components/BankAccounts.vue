<template>
  <div class="bank_accounts container">
    <b-card
      class="users"
      header="Bank Accounts"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <div v-if="this.user === 'TIER2'">
        <b-link :to="{name: 'create', params: { action: this.action, user: this.user } }">
          <b-button class="btn" variant="info">Add User</b-button>
        </b-link>
        <b-button class="btn" variant="info">Open Bank Account</b-button>
      </div>
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
          <b-button variant="info">Modify</b-button>
        </template>
        <template slot="Close" slot-scope="data">
          <b-button variant="info" @click="accClose(data.index)">Close</b-button>
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
    </b-card>
  </div>
</template>

<script>
export default {
  name: "bank_accounts",
  mounted: function() {
    this.getUrl();
    this.getUsers();
    this.getAction();
  },
  props: {
    userType: {
      type: String,
      required: true
    },
    userId: {
      type: String
    }
  },
  data: function() {
    return {
      isBusy: false,
      accountUrl: "",
      id: this.userId,
      user: this.userType,
      action: null,
      perPage: 5,
      currentPage: 1,
      totalRows: "",
      accounts: [
        {
          isActive: true,
          user_id: "1",
          age: 40,
          usertypeid: "CUSTOMER",
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        {
          isActive: false,
          user_id: "2",
          age: 21,
          usertypeid: "MERCHANT",
          first_name: "Larsen",
          last_name: "Shaw"
        },
        {
          isActive: false,
          user_id: "3",
          age: 89,
          usertypeid: "CUSTOMER",
          first_name: "Geneva",
          last_name: "Wilson"
        },
        {
          isActive: true,
          user_id: "4",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          user_id: "5",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          user_id: "6",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          user_id: "7",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          user_id: "8",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          user_id: "9",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        }
      ]
    };
  },
  methods: {
    getUrl: function() {
      if (this.user === "TIER1" || this.user === "TIER2") {
        this.accountUrl = process.env.VUE_APP_ACCOUNT_LIST_INTERNAL;
      } else {
        this.accountUrl =
          process.env.VUE_APP_ACCOUNT_LIST_EXTERNAL + this.userId;
      }
    },
    getUsers: function() {
      this.toggleBusy();
      this.axios.get(this.accountUrl).then(function(response) {
        this.accounts = response.body.users;
      });
      this.totalRows = this.accounts.length;
      this.toggleBusy();
    },
    getAction: function() {
      if (this.user === "TIER2") {
        this.action = "external";
      }
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    accClose: function(i) {
      var id = this.accounts.splice(i, 1).id;
      let closeUrl = process.env.VUE_APP_ACCOUNT + id;
      this.axios.delete(closeUrl).then(function() {});
      this.$refs.table.refresh();
    },
    updateField: function() {
      var field = Object.keys(this.accounts[0]);
      if (this.user === "TIER2") {
        field.push("Modify", "Close");
      }
      return field;
    },
    loadAccount: function(item) {
      this.$router.push(this.forUser(item));
    },
    forUser: function(item) {
      if (this.userType === "CUSTOMER" || this.userType === "MERCHANT") {
        return {
          name: "account",
          params: { userid: this.id, usertype: this.userType }
        };
      } else {
        return {
          name: "account",
          params: { userid: item.user_id, usertype: item.usertypeid }
        };
      }
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