<template>
  <div class="formvue">
    <User :users="this.userList(this.userType)"/>
    <!-- <Trans/> -->
  </div>
</template>

<script>
import User from "@/components/UserForm.vue";
// import Trans from "@/components/TransForm.vue";

export default {
  name: "formvue",
  created: function() {
    this.userList(this.userType);
  },
  components: {
    User
    // ,Trans
  },
  data: function() {
    return {
      action: this.$route.params.action,
      userType: this.$route.params.user
    };
  },
  methods: {
    userList: function(type) {
      if (type === "TIER2") {
        return ["CUSTOMER", "MERCHANT"];
      } else if (type === "TIER3") {
        return ["TIER1", "TIER2"];
      }
    }
  }
};
</script>

<style scoped>
</style>