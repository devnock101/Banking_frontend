<template>
  <div class>
    <div class="userform">
      <b-card border-variant="light" nobody>
        <b-form @submit.prevent="submitForm">
          <b-form-select
            v-model="transObj.fromAccountId"
            class="input"
            :options="this.accounted"
          >
            <template slot="first">
              <option
                :value="null"
                disabled
                v-if="this.act === 'transfer'||this.act === 'move'"
              >Please select an account to send from</option>
              <option
                :value="null"
                disabled
                v-if="this.act === 'credit'||this.act === 'debit'||this.act === 'check'"
              >Please select an account</option>
            </template>
          </b-form-select>

          <b-input
            id="to"
            class="input"
            type="text"
            v-model="emailOrPhone"
            placeholder="Send using email or phone"
            v-if="this.act === 'transfer'"
          />

          <b-input
                  id="check"
                  class="input"
                  type="text"
                  placeholder="Name on the check"
                  v-if="this.act === 'check'"
          />

          <b-form-select
            v-model="transObj.toAccountId"
            class="input"
            :options="this.accounted"
            v-if="this.act === 'move'"
          >
            <template slot="first">
              <option :value="null" disabled>Please select an account to send to</option>
            </template>
          </b-form-select>

          <b-input-group>
            <b-input
              id="amount"
              class="input"
              type="text"
              v-model="transObj.amount"
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
      type: Number,
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
      emailOrPhone: null,
      transObj: {
        transactionTypeId: this.actType(),
        fromAccountId: null,
        toAccountId: null,
        amount: null
      },
      accounts: [
        {
          isActive: true,
          userid: "1",
          bankingAccountId: "1",
          age: 40,
          usertypeid: "CUSTOMER",
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        {
          isActive: false,
          userid: "2",
          bankingAccountId: "2",
          age: 21,
          usertypeid: "MERCHANT",
          first_name: "Larsen",
          last_name: "Shaw"
        },
        {
          isActive: false,
          userid: "3",
          bankingAccountId: "3",
          age: 89,
          usertypeid: "CUSTOMER",
          first_name: "Geneva",
          last_name: "Wilson"
        },
        {
          isActive: true,
          userid: "4",
          bankingAccountId: "4",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "5",
          bankingAccountId: "5",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "6",
          bankingAccountId: "6",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "7",
          bankingAccountId: "7",
          age: 38,
          usertypeid: "MERCHANT",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "8",
          bankingAccountId: "8",
          age: 38,
          usertypeid: "CUSTOMER",
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          userid: "9",
          bankingAccountId: "9",
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
      let self = this;
      this.axios.get(accUrl).then(response => {
        this.accounts = response.data;
      }).then(()=>{
        self.makeAccountList();
      });
    },
    makeAccountList: function() {
      let temp = [];
      let len = this.accounts.length;
      for (let i = 0; i < len; i++) {
        temp.push(this.accounts[i].bankingAccountId);
      }
      this.accounted = temp;
    },
    actType: function() {
      if (this.act === "move" || this.act === "transfer") {
        return "TRANSFER";
      } else if (this.act === "credit") {
        return "CREDIT";
      } else if (this.act === "debit" || this.act === "check") {
        return "DEBIT";
      }
    },
    submitForm: function() {
      let searchUrl = process.env.VUE_APP_ACC_SEARCH + this.emailOrPhone;
      if(this.act === "transfer"){
        this.axios.get(searchUrl).then(response => {
        this.transObj.toAccountId = response.data;
      });
      }
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