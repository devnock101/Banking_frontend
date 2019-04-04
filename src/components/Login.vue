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
    <div>
      <keyboard
              v-model="input"
              @custom="custom"
              @input="changed"
              :layouts="[
        '1234567890{delete:backspace}|qwertyuiop-|asdfghjkl=/|{caps:goto:1}zxcvbnm,.|{space:space}{Toggle-Username-Password:custom}',
        '!@#$%^&*(){delete:backspace}|QWERTYUIOP_|ASDFGHJKL+?|{caps:goto:0}ZXCVBNM<>|{space:space}{Toggle-Username-Password:custom}'
    ]"
              :maxlength="16"
      ></keyboard>
    </div>
  </div>
</template>

<script>
  import keyboard from "vue-keyboard";

export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: "",
      tag: false,
      input:""
    };
  },
  components: {
    keyboard
  },
  methods: {
    login: function() {
      let loginUrl = process.env.VUE_APP_LOGIN_IN;
      var self = this;
      this.axios
        .post(loginUrl, {
          username: this.username,
          password: this.password
        })
        .then(() => {
          self.$router.push({ name: "user" });
        });
    },
    changed() {
      if(!this.tag){
        this.username = this.input;
      } else {
        this.password = this.input;
      }
    },

    custom() {
      this.input = "";
      this.tag = !this.tag;
    }
  }
};
</script>

<style scoped>
.loginCard {
  align-self: auto;
  align-content: center;
  width: 40%;
  margin: 12% auto;
}
</style>