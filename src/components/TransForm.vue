<template>
  <div class="userform container">
    <b-card border-variant="light">
      <b-form @submit.prevent="submitForm">
        <div class="d-flex">
          <b-input
            id="from"
            class="input1"
            type="text"
            v-model="transObj.fromAccountId"
            placeholder="From"
          />
          <b-input
            id="to"
            class="input"
            type="text"
            v-model="transObj.toAccountId"
            placeholder="To"
          />
          <b-form-select
            v-model="transObj.transactionTypeId"
            class="input2"
            :options="this.transTypes"
          >
            <template slot="first">
              <option :value="null" disabled>Please select an option</option>
            </template>
          </b-form-select>
        </div>
        <b-input-group>
          <b-input
            id="amount"
            class="input"
            type="text"
            v-model="transObj.amount"
            placeholder="Amount"
          />
          <b-button variant="primary" class="input" @click="submitForm" slot="append">Transfer</b-button>
        </b-input-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "transform",
  data: function() {
    return {
      transTypes: ["CREDIT", "DEBIT", "TRANSFER"],
      transObj: {
        transactionTypeId: null,
        fromAccountId: null,
        toAccountId: null,
        amount: null
      }
    };
  },
  methods: {
    submitForm: function() {
      let createUrl = process.env.VUE_APP_TRANS_CREATE;
      this.axios.post(createUrl, this.transObj).then(() => {this.$router.push({ name: "user" });});
    }
  }
};
</script>

<style scoped>
.userform {
  width: 60%;
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
</style>