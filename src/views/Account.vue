<template>
  <div class="account container">
    <AccDetails :userId="this.id"/>
    <TransList v-if="this.user !== 'ROLE_ADMIN'"/>
    <Log :userid="this.id" v-if="this.user === 'ROLE_ADMIN'"/>
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
  data: function() {
    return {
      id: this.$route.params.userid,
      user: this.$route.params.usertype
    };
  }
};
</script>

<style scoped>
</style>
