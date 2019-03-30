

<script>
export default {
  name: "logout",
  mounted: function() {
    this.logout();
  },
  methods: {
    logout: function() {
      this.$route.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
</style>