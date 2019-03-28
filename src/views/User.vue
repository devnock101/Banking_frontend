<template>
  <div>
    <AccDetails
      v-if="this.userObj.usertypeid === 'CUSTOMER' || this.userObj.usertypeid === 'MERCHANT'"
    />
    <TransList
      v-if="this.userObj.usertypeid === 'CUSTOMER' || this.userObj.usertypeid === 'MERCHANT'"
    />
    <UserAccounts v-if="this.userObj.usertypeid === 'TIER3'"/>
    <BankAccounts v-if="this.userObj.usertypeid !== 'TIER3'"/>
    <TransReq v-if="this.userObj.usertypeid === 'TIER1' || this.userObj.usertypeid === 'TIER2'"/>
  </div>
</template>

<script>
import AccDetails from "@/components/AccDetails.vue";
import TransList from "@/components/Transactions.vue";
import UserAccounts from "@/components/UserAccounts.vue";
import BankAccounts from "@/components/BankAccounts.vue";
import TransReq from "@/components/TransReq.vue";

export default {
  name: "user",
  mounted: function() {
    //this.getUser();
  },
  data: function() {
    return {
      userObj: {
        usertypeid: "CUSTOMER"
      }
    };
  },
  props: {
    accountView: Boolean,
    accountId: String
  },
  components: {
    AccDetails,
    TransList,
    UserAccounts,
    BankAccounts,
    TransReq
  },
  methods: {
    getUser: function() {
      let userUrl = process.env.VUE_APP_USER_INFO;
      this.axios.get(userUrl).then(function(response) {
        this.userObj = response.data.user;
      });
    }
  }
};
</script>

<style scoped>
</style>