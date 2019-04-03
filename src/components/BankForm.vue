<template>
  <div class="userform">
    <b-form @submit.prevent="submitForm">
      <b-input-group>
        <b-form-select
          id="userid"
          class="input"
          v-model.number="extra"
          :options="this.userIdList"
          v-if="this.userid === null"
        >
          <template slot="first">
            <option :value="null" disabled>Please select a user</option>
          </template>
        </b-form-select>
        <b-form-select
          v-model="userObj.bankingAccountType"
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
  mounted: function(){
    if(this.userid === null)
    {
      this.getUsers();
    }
  },
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
      userList: [],
      userIdList: [],
      extra: null,
      userObj: {
        userId: null,
        accountNumber: null,
        bankingAccountType: null,
        balance: 0,
        status: "PENDING"
      }
    };
  },
  methods: {
    getUsers: function()
    {
      let usersUrl = process.env.VUE_APP_CUSTOM_LIST;
      this.axios.get(usersUrl).then(response => {
        this.userList = response.data;
        for( let i = 0; i < this.userList.length; i++){
          this.userIdList.push(this.userList[i].userid);
        }
      });
    },
    userIDFunc: function() {
      if(this.userid === null) {
        this.userObj.userId = this.extra;
      } else {
        this.userObj.userId = this.userid;
      }
    },
    submitForm: function() {
      this.userIDFunc();
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