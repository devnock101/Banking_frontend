<template>
  <div class="form">
    <Create :id="this.$route.params.id" :action="this.$route.params.action"/>
  </div>
</template>

<script>
import Create from "@/components/Acc_Form.vue";

export default {
  name: "form",
  components: {
    Create
  }
};
</script>

<style scoped>
</style>