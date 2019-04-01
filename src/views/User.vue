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
          <Support/>
        </b-tab>
<!--        <b-tab title="Logout" no-body>-->
<!--            <Logout/>-->
<!--        </b-tab>-->
<!--        <b-botton>Hello</b-botton>-->
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import AccDetails from "@/components/AccDetails.vue";
import EmplyAccounts from "@/components/EmployeeAccounts.vue";
import BankAccounts from "@/components/BankAccounts.vue";
import TransReq from "@/components/TransReq.vue";
import Logout from "@/components/Logout.vue";
import Support from "@/components/Support.vue";

export default {
  name: "user",
  created: function() {
    this.getUser();
  },
  data: function() {
    return {
      userObj: {
        userid: "",
        role: ""
      }
    };
  },
  components: {
    AccDetails,
    EmplyAccounts,
    BankAccounts,
    TransReq,
    Logout,
    Support
  },
  methods: {
    getUser: function() {
      let userUrl = process.env.VUE_APP_USER_INFO;
      this.axios.get(userUrl).then(response => {
        this.userObj = response.data;
      });
    }
  }
};
</script>

<style scoped>
</style>