<template>
  <div class="formvue">
    <User
      :users="this.userList(this.userType)"
      :id="null"
      v-if="(this.action === 'user_new') && this.userType === 'ROLE_TIER2'"
    />
    <User
      :users="this.userList(this.userType)"
      :id="null"
      v-if="(this.action === 'employee') && this.userType === 'ROLE_ADMIN'"
    />
    <User
      :users="this.userList(this.userType)"
      :id="this.userId"
      v-if="(this.action === 'user_mod') && this.userType === 'ROLE_TIER2'"
    />
    <User
      :users="this.userList(this.userType)"
      :id="this.userId"
      v-if="(this.action === 'employee_mod') && this.userType === 'ROLE_ADMIN'"
    />
    <Trans v-if="this.userTest()"/>
    <Move :userId="this.userId" v-if="(this.action === 'move' && this.userType === 'ROLE_CUSTOMER')"/>
  </div>
</template>

<script>
import User from "@/components/UserForm.vue";
import Trans from "@/components/TransForm.vue";
import Move from "@/components/TransFund.vue";

export default {
  name: "formvue",
  created: function() {
    this.userList(this.userType);
  },
  components: {
    User,
    Trans,
    Move
  },
  data: function() {
    return {
      action: this.$route.params.action,
      userType: this.$route.params.user,
      userId: this.$route.params.userid
    };
  },
  methods: {
    userList: function(type) {
      if (type === "ROLE_TIER2") {
        return ["ROLE_CUSTOMER", "ROLE_MERCHANT"];
      } else if (type === "ROLE_ADMIN") {
        return ["ROLE_TIER1", "ROLE_TIER2"];
      }
    },
    userTest: function() {
      return (
        this.action === "transaction" &&
        (this.userType === "ROLE_TIER1" ||
          this.userType === "ROLE_TIER2" ||
          this.userType === "ROLE_CUSTOMER" ||
          this.userType === "ROLE_MERCHANT")
      );
    }
  }
};
</script>

<style scoped>
</style>
