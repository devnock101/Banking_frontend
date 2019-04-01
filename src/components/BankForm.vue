<template>
  <div class="userform">
    <b-form @submit.prevent="submitForm">
      <b-input-group>
        <b-input
          id="userid"
          class="input"
          type="text"
          v-model.number="userObj.userId"
          placeholder="Customer Account Number"
          v-if="this.userid === null"
        />
        <b-form-select
          v-model= "userObj.bankingAccountType"
          class="input3"
          :options="this.users"
        >
          <template slot="first">
            <option :value="null" disabled>Please select an account type</option>
          </template>
        </b-form-select>
        <b-button variant="primary" slot="append" class="input" @click="submitForm">Add</b-button>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "bankform",
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  data: function() {
    return {
      users: ["CHECKING", "SAVING", "CREDIT"],
      userid: this.id,
      userObj: {
        userId: null,
        bankingAccountType: null,
        balance: 0,
        accountNumber: -9999,
        status: "PENDING"
      }
    };
  },
  methods: {
    submitForm: function() {
      let createUrl = process.env.VUE_APP_ACCOUNT_CREATE;
      this.axios.post(createUrl, this.userObj);
      this.$router.push({ name: "user" });
    }
  }
};
</script>

<style scoped>
.userform {
  width: 70%;
  margin: 3% auto;
}
.input {
  margin: 7px auto;
}
.input1 {
  margin: 7px 5px 7px 0px;
}
.input2 {
  margin: 7px 0px 7px 5px;
}
.input3 {
  margin: 7px auto;
}
</style>