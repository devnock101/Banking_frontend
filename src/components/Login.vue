<template>
  <div class="login container">
    <b-card
      class="loginCard"
      header="Login Form"
      header-bg-variant="dark"
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
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: "",
      output: ""
    };
  },
  methods: {
    login: function() {
      let loginUrl = process.env.VUE_APP_LOGIN_IN;
      // let header = {
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
      // };
      // let params = {
      //   username: this.username,
      //   password: this.password
      // };

      // var form_data = "";
      // for (var key in params) {
      //   form_data +=
      //     encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
      // }
      // let len = form_data.length;
      // len -= 1;
      // form_data = form_data.substring(0, len);

      // this.axios.post(loginUrl, form_data, header).then(response => {
      //   this.output = response.data;
      // });

      this.axios
        .post(
          loginUrl,
          {
            username: this.username,
            password: this.password
          },
          {
            credentials: "same-origin"
          }
        )
        .then(response => {
          this.output = response.data;
        });
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