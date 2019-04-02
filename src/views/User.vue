<template>
  <div>
    <b-card no-body>
      <b-tabs card pills content-class="mt-3">
        <b-tab
          title="Details"
          v-if="this.userObj.role === 'ROLE_CUSTOMER' || this.userObj.role === 'ROLE_MERCHANT'"
        >
          <AccDetails :userId="this.userObj.userid"/>
        </b-tab>
        <b-tab
                title="Accounts"
                v-if="this.userObj.role === 'ROLE_TIER1' ||
                        this.userObj.role === 'ROLE_TIER2' || 
                        this.userObj.role === 'ROLE_CUSTOMER' || 
                        this.userObj.role === 'ROLE_MERCHANT'"
        >
          <BankAccounts :userType="this.userObj.role" :userId="this.userObj.userid"/>
        </b-tab>
        <b-tab
          title="Transactions"
          v-if="this.userObj.role === 'ROLE_TIER1' || this.userObj.role === 'ROLE_TIER2'"
        >
          <TransReq :userType="this.userObj.role" :userId="this.userObj.userid"/>
        </b-tab>
        <b-tab title="Accounts" v-if="this.userObj.role === 'ROLE_ADMIN'">
          <EmplyAccounts/>
        </b-tab>
        <b-tab
          title="Support"
          v-if="this.userObj.role === 'ROLE_CUSTOMER' || this.userObj.role === 'ROLE_MERCHANT'"
        >
          <Support :userId="this.userObj.userid"/>
        </b-tab>
        <template slot="tabs">
          <b-nav-item @click="logout">Logout</b-nav-item>
        </template>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import AccDetails from "@/components/AccDetails.vue";
import EmplyAccounts from "@/components/EmployeeAccounts.vue";
import BankAccounts from "@/components/BankAccounts.vue";
import TransReq from "@/components/TransReq.vue";
import Support from "@/components/Support.vue";

export default {
  name: "user",
  created: function() {
    this.getUser();
  },
  data: function() {
    return {
      userObj: {
        userid: null,
        role: null
      }
    };
  },
  components: {
    AccDetails,
    EmplyAccounts,
    BankAccounts,
    TransReq,
    Support
  },
  methods: {
    getUser: function() {
      let userUrl = process.env.VUE_APP_USER_INFO;
      this.axios.get(userUrl).then(response => {
        this.userObj = response.data;
      });
    },
    logout: function() {
      let logOut = process.env.VUE_APP_LOGOUT;
      this.axios.get(logOut).then(()=>{
        this.$router.push({ path: "/" });
      });
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
</style>