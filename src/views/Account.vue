<template>
  <div class="account container">
    <AccDetails :userId="this.id"/>
    <TransList :account="this.accountid" v-if="this.usertype !== 'TIER3'"/>
    <Log :userid="this.id" v-if="this.usertype === 'TIER3'"/>
  </div>
</template>

<script>
import AccDetails from "@/components/AccDetails.vue";
import TransList from "@/components/Transactions.vue";
import Log from "@/components/Log.vue";

export default {
  name: "account",
  components: {
    AccDetails,
    TransList,
    Log
  },
  props: {
    userid: {
      type: String,
      required: true
    },
    accountid: {
      type: String
    },
    usertype: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      id: this.userid,
      account: this.accountid,
      user: this.usertype
    };
  }
};
</script>

<style scoped>
</style>