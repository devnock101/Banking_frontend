<template>
  <div class="bank_accounts">
    <b-card
      class="users"
      header="Bank Accounts"
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
            hover
            outlined
            responsive
            :current-page="currentPage"
            :per-page="perPage"
            :fields="updateField()"
            :items="accounts"
            @row-clicked="loadAccount"
          >
            <template slot="Modify" slot-scope="data">
              <b-link
                :to="{name: 'create', params: { action: 'user_mod', user: 'ROLE_TIER2', id: data.item.userId} }"
              >
                <b-button variant="primary">Modify</b-button>
              </b-link>
            </template>
            <template slot="Close" slot-scope="data">
              <b-button variant="primary" @click="accClose(data.index)">Close</b-button>
            </template>

            <!-- <template slot="View" slot-scope="row">
              <b-button
                variant="primary"
                @click="row.toggleDetails"
              >{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
            </template>

            <template slot="row-details" slot-scope="row">
              <b-card>
                <AccDetails :userId="row.item.userid"/>
                <TransList/>
              </b-card>
            </template>-->
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
        <b-tab title="Add User" v-if="this.user === 'ROLE_TIER2'">
          <User :users="this.users" :id="null"/>
        </b-tab>
        <b-tab title="Add Bank Account" v-if="this.user === 'ROLE_TIER2'">
          <Account/>
        </b-tab>
        <b-tab title="Bank Account Requests" v-if="this.user === 'ROLE_TIER2'">
          <UserReq/>
        </b-tab>
        <b-tab
          title="New Bank Account"
          v-if="this.user === 'ROLE_CUSTOMER' || this.user === 'ROLE_MERCHANT'"
        >
          <Account :id="this.id"/>
        </b-tab>
        <b-tab
          title="Move Funds"
          v-if="this.user === 'ROLE_CUSTOMER' || this.user === 'ROLE_MERCHANT'"
        >
          <Move :userId="this.userId" :action="this.move"/>
        </b-tab>
        <b-tab
          title="Credit Funds"
          v-if="this.user === 'ROLE_CUSTOMER' || this.user === 'ROLE_MERCHANT'"
        >
          <Move :userId="this.userId" :action="this.credit"/>
        </b-tab>
        <b-tab
          title="Debit Funds"
          v-if="this.user === 'ROLE_CUSTOMER' || this.user === 'ROLE_MERCHANT'"
        >
          <Move :userId="this.userId" :action="this.debit"/>
        </b-tab>
        <b-tab
          title="Transfer Funds"
          v-if="this.user === 'ROLE_CUSTOMER' || this.user === 'ROLE_MERCHANT'"
        >
          <Move :userId="this.userId" :action="this.transfer"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import User from "@/components/UserForm.vue";
import Account from "@/components/BankForm.vue";
import Move from "@/components/TransFund.vue";
import UserReq from "@/components/UserReq.vue";

export default {
  name: "bank_accounts",
  created: function() {
    this.getUrl();
    this.getUsers();
  },
  mounted: function() {
    this.getAction();
  },
  components: {
    User,
    Account,
    Move,
    UserReq
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
      head: this.header,
      isBusy: false,
      accountUrl: "",
      id: this.userId,
      user: this.userType,
      userid: null,
      users: ["CUSTOMER", "MERCHANT"],
      action_user_new: null,
      action_user_mod: null,
      action_account: null,
      move: "move",
      transfer: "transfer",
      credit: "credit",
      debit: "debit",
      action_transaction: null,
      perPage: 8,
      currentPage: 1,
      totalRows: 1,
      accounts: [
        {
          isActive: true,
          userid: "1",
          age: 40,
          usertypeid: "CUSTOMER",
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        {
          isActive: false,
          userid: "2",
          age: 21,
          usertypeid: "MERCHANT",
          first_name: "Larsen",
          last_name: "Shaw"
        },
        {
          isActive: false,
          userid: "3",
          age: 89,
          usertypeid: "CUSTOMER",
          first_name: "Geneva",
          last_name: "Wilson"
        },
        {
          isActive: true,
          userid: "4",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "5",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "6",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "7",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "8",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "9",
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
      if (this.user === "ROLE_TIER1" || this.user === "ROLE_TIER2") {
        this.accountUrl = process.env.VUE_APP_ACCOUNT_LIST_INTERNAL;
      } else {
        this.accountUrl =
          process.env.VUE_APP_ACCOUNT_LIST_EXTERNAL + this.userId;
      }
    },
    getUsers: function() {
      this.toggleBusy();
      this.axios.get(this.accountUrl, this.head).then(response => {
        this.accounts = response.data;
      });
      this.totalRows = this.accounts.length;
      this.$refs.table.refresh();
      this.toggleBusy();
    },
    getAction: function() {
      if (this.user === "ROLE_TIER2") {
        (this.action_user_new = "user_new"),
          (this.action_user_mod = "user_mod"),
          (this.action_account = "account");
      } else if (
        this.user === "ROLE_CUSTOMER" ||
        this.user === "ROLE_MERCHANT"
      ) {
        this.action_transaction = "transaction";
      }
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    accClose: function(i) {
      var id = this.accounts.splice(i, 1).id;
      let closeUrl = process.env.VUE_APP_ACCOUNT + id;
      this.axios.delete(closeUrl, this.head).then(function() {});
      this.$refs.table.refresh();
    },
    updateField: function() {
      var field = Object.keys(this.accounts[0]);
      if (this.user === "ROLE_TIER2") {
        // field.push("View", "Modify", "Close");
        field.push("Modify", "Close");
      }
      return field;
    },
    loadAccount: function(item) {
      this.$router.push(this.forUser(item));
    },
    forUser: function(item) {
      if (
        this.userType === "ROLE_CUSTOMER" ||
        this.userType === "ROLE_MERCHANT"
      ) {
        return {
          name: "account",
          params: { userid: this.id, usertype: this.userType }
        };
      } else {
        return {
          name: "account",
          params: { userid: item.userid, usertype: item.usertypeid }
        };
      }
    }
  }
};
</script>

<style scoped>
.users {
  margin: 3% auto;
}
.btn {
  margin: 0px 10px 20px;
}
</style>