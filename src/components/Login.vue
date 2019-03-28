<template>
  <div class="login container">
    <b-card
      class="loginCard"
      header="Login Form"
      header-bg-variant="info"
      header-text-variant="white"
      header-tag="header"
    >
      <div>
        <b-form @submit.prevent="login()">
          <label class="sr-only" for="formInputName2">Name</label>
          <b-input-group prepend="Username" class="inputfield mb-2 mr-sm-2 mb-sm-0">
            <b-form-input v-model="username" type="text" id="formInputName2"/>
          </b-input-group>
          <br>
          <label class="sr-only" for="formInputGroupUsername2">Username</label>
          <b-input-group prepend="Password" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input v-model="password" type="password" id="formInputGroupUsername2"/>
          </b-input-group>
          <br>
          <b-button type="submit" variant="info">Login</b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
// const axios = require("axios");

export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: "",
      reponse: {}
    };
  },
  methods: {
    login: function() {
      //let loginUrl = process.env.VUE_APP_LOGIN_IN;
      // this.axios
      //   .post(loginUrl, {
      //     username: this.user,
      //     password: this.pass
      //   })
      //   .then(function() {});

      // this.axios(loginUrl, {
      //   method: "POST",
      //   mode: "no-cors",
      //   data: {
      //     username: this.user,
      //     password: this.pass
      //   },
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   withCredentials: true,
      //   credentials: "same-origin"
      // }).then(function(response) {
      //   this.response = response;
      // });

      this.$router.push({ name: "user" });
    }
  }
};
</script>

<style scoped>
.loginCard {
  align-self: auto;
  align-content: center;
  width: 40%;
  margin: 22% auto;
}
</style>