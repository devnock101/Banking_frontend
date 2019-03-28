<template>
  <div class="acc_form container">
    <b-form-group>
      <b-form @submit.prevent>
        <b-form-group inline>
          <label>First Name</label>
          <b-form-input v-model="first_name" placeholder="First Name" type="text" id="fname"/>
          <label>Last Name</label>
          <b-form-input v-model="last_name" placeholder="Last Name" type="text" id="lname"/>
        </b-form-group>
      </b-form>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "Acc_Form",
  props: {
    id: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>