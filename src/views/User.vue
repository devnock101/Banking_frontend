<template>
  <div>
    <AccDetails
      :userId="this.userObj.userid"
      v-if="this.userObj.usertypeid === 'CUSTOMER' || this.userObj.usertypeid === 'MERCHANT'"
    />
    <BankAccounts
      :userType="this.userObj.usertypeid"
      :userId="this.userObj.userid"
      v-if="this.userObj.usertypeid === 'TIER1' || 
                        this.userObj.usertypeid === 'TIER2' || 
                        this.userObj.usertypeid === 'CUSTOMER' || 
                        this.userObj.usertypeid === 'MERCHANT'"
    />
    <TransReq v-if="this.userObj.usertypeid === 'TIER1' || this.userObj.usertypeid === 'TIER2'"/>
    <EmplyAccounts v-if="this.userObj.usertypeid === 'TIER3'"/>
  </div>
</template>

<script>
import AccDetails from "@/components/AccDetails.vue";
import EmplyAccounts from "@/components/EmployeeAccounts.vue";
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
        // usertypeid: "TIER1",
        usertypeid: "TIER2",
        // usertypeid: "TIER3",
        // usertypeid: "CUSTOMER",
        // usertypeid: "MERCHANT",
        userid: "1234"
      }
    };
  },
  components: {
    AccDetails,
    EmplyAccounts,
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