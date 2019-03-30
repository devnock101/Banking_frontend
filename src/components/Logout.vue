<template>
  <div>GOODBYE!</div>
</template>


<script>
export default {
  name: "logout",
  mounted: function() {
    this.logout();
  },
  methods: {
    logout: function() {
      let logOut = process.env.VUE_APP_LOGOUT;
      this.axios.get(logOut).then(function() {});
      this.$route.push({ path: "/" }); //Add router guard here
    }
  }
};
</script>

<style scoped>
</style>