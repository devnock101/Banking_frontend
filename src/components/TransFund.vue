<template>
  <div class>
    <div class="userform">
      <b-card border-variant="light" nobody>
        <b-form @submit.prevent="submitForm">
          <!-- <b-form-select v-model="this.transObj.toAccountId" :options="options"> -->
          <b-input
            id="from"
            class="input"
            type="text"
            v-model="this.transObj.fromAccountId"
            placeholder="From"
          />
          <!-- <b-form-select
            v-model="this.userObj.bankingAccountType"
            class="input3"
            :options="this.users"
          >
            <template slot="first">
              <option :value="null" disabled>Please select an option</option>
            </template>
          </b-form-select>-->
          <b-input
            id="to"
            class="input"
            type="text"
            v-model="this.transObj.fromAccountId"
            placeholder="To"
          />
          <b-input-group>
            <b-input
              id="amount"
              class="input"
              type="text"
              v-model="this.transObj.amount"
              placeholder="Amount"
            />
            <b-button variant="primary" slot="append" class="input" @click="submitForm">Transfer</b-button>
          </b-input-group>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "transfund",
  props: {
    userId: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  mounted: function() {
    this.getAccounts();
  },
  data: function() {
    return {
      accounted: ["1", "2", "3"],
      user: this.userType,
      act: this.action,
      id: this.userId,
      transObj: {
        transactionTypeId: "TRANSFER",
        fromAccountId: null,
        toAccountId: null,
        amount: null
      },
      accounts: [
        {
          isActive: true,
          userid: "1",
          accountid: "1",
          age: 40,
          usertypeid: "CUSTOMER",
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        {
          isActive: false,
          userid: "2",
          accountid: "2",
          age: 21,
          usertypeid: "MERCHANT",
          first_name: "Larsen",
          last_name: "Shaw"
        },
        {
          isActive: false,
          userid: "3",
          accountid: "3",
          age: 89,
          usertypeid: "CUSTOMER",
          first_name: "Geneva",
          last_name: "Wilson"
        },
        {
          isActive: true,
          userid: "4",
          accountid: "4",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "5",
          accountid: "5",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "6",
          accountid: "6",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "7",
          accountid: "7",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "8",
          accountid: "8",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "9",
          accountid: "9",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        }
      ]
    };
  },
  methods: {
    getAccounts: function() {
      let accUrl = process.env.VUE_APP_ACCOUNT_LIST_EXTERNAL + this.id;
      this.axios.get(accUrl).then(response => {
        this.accounts = response.data;
      });
    },
    submitForm: function() {
      let createUrl = process.env.VUE_APP_TRANS_CREATE;
      this.axios.post(createUrl, this.transObj).then(function() {});
      this.$router.push({ name: "user" });
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