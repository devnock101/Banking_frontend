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
      v-if="(this.action === 'employee') && this.userType === 'ROLE_TIER3'"
    />
    <User
      :users="this.userList(this.userType)"
      :id="this.userId"
      v-if="(this.action === 'user_mod') && this.userType === 'ROLE_TIER2'"
    />
    <User
      :users="this.userList(this.userType)"
      :id="this.userId"
      v-if="(this.action === 'employee_mod') && this.userType === 'ROLE_TIER3'"
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
      userId: this.$route.params.id
    };
  },
  methods: {
    userList: function(type) {
      if (type === "TIER2") {
        return ["CUSTOMER", "MERCHANT"];
      } else if (type === "TIER3") {
        return ["TIER1", "TIER2"];
      }
    },
    userTest: function() {
      return (
        this.action === "transaction" &&
        (this.userType === "TIER1" ||
          this.userType === "TIER2" ||
          this.userType === "CUSTOMER" ||
          this.userType === "MERCHANT")
      );
    }
  }
};
</script>

<style scoped>
</style>