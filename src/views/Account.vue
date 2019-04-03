<template>
  <div>
    <b-tabs card pills content-class="mt-3">
      <div v-if="this.user !== 'ROLE_CUSTOMER' || this.user !== 'ROLE_MERCHANT'">
      <b-tab title="Details">
        <AccDetails :userId="this.id"/>
      </b-tab>
      </div>
      <b-tab title="Transaction History"  v-if="this.user !== 'ROLE_ADMIN'">
        <TransList/>
      </b-tab>
      <b-tab title="Log" v-if="this.user === 'ROLE_ADMIN'">
        <Log :userid="this.id"/>
      </b-tab>
      <b-tab
              title="Support"
              v-if="this.user === 'ROLE_CUSTOMER' || this.user === 'ROLE_MERCHANT'"
      >
        <Support :userId="this.id"/>
      </b-tab>
      <template slot="tabs">
        <b-nav-item @click="back">Back</b-nav-item>
      </template>
      <template slot="tabs">
        <b-nav-item @click="logout">Logout</b-nav-item>
      </template>
    </b-tabs>
  </div>
</template>

<script>
import AccDetails from "@/components/AccDetails.vue";
import TransList from "@/components/Transactions.vue";
import Log from "@/components/Log.vue";
import Support from "@/components/Support.vue";

export default {
  name: "account",
  components: {
    AccDetails,
    TransList,
    Log,
    Support
  },
  data: function() {
    return {
      id: this.$route.params.userid,
      user: this.$route.params.usertype
    };
  },
  methods: {
    back: function() {
      this.$router.push({ path: "/user" });
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
