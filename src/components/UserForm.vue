<template>
  <div class="userform container">
    <div class="user container">
      <b-card header="Add User" header-bg-variant="dark" header-text-variant="white">
        <b-form @submit.prevent="checkForm">
          <b-input
            id="fname"
            class="input"
            type="text"
            v-model="this.userObj.fname"
            placeholder="First Name"
          />
          <b-input
            id="lname"
            class="input"
            type="text"
            v-model="this.userObj.lname"
            placeholder="Last name"
          />
          <b-input
            id="user"
            type="text"
            class="input"
            v-model="this.userObj.user"
            placeholder="Username"
          />
          <b-input
            id="pass"
            v-model="this.userObj.pass"
            class="input"
            type="password"
            name="pass"
            placeholder="Password"
          />
          <b-input
            id="pass2"
            v-model="this.userObj.pass2"
            type="password"
            name="pass_verify"
            placeholder="Verify Password"
            class="input"
          />
          <b-input
            id="email"
            class="input"
            v-model="this.userObj.email"
            type="email"
            name="email"
            placeholder="Email"
          />
          <b-input
            id="phone"
            v-model="this.userObj.phone"
            class="input"
            type="tel"
            name="phone"
            placeholder="Phone"
          />
          <b-input
            id="phone2"
            v-model="this.userObj.phone2"
            type="tel"
            class="input"
            name="phone2"
            placeholder="Alternate Phone"
          />
          <b-input
            name="date_between_field"
            type="date"
            v-model="this.userObj.dob"
            class="input"
            placeholder=" Date of Birth"
          />
          <b-input
            id="street"
            v-model="this.userObj.address.street"
            type="text"
            class="input"
            name="street"
            placeholder="Street Address"
          />
          <b-input
            id="street2"
            v-model="this.userObj.address.street2"
            type="text"
            class="input"
            name="street2"
            placeholder="Street Address (Optional)"
          />
          <b-input
            id="city"
            v-model="this.userObj.address.city"
            type="text"
            class="input"
            name="city"
            placeholder="Town/City"
          />
          <b-input
            id="state"
            v-model="this.userObj.address.state"
            type="text"
            class="input"
            name="state"
            placeholder="State"
          />
          <b-input
            id="country"
            v-model="this.userObj.address.country"
            type="text"
            class="input"
            name="country"
            placeholder="Country"
          />
          <b-input
            id="zipcode"
            v-model="this.userObj.address.zipcode"
            type="number"
            class="input"
            name="street"
            placeholder="Zip Code"
          />
          <b-dropdown id="ddown1" text="User Type" class="m-md-2" v-model="this.userObj.usertypeid">
            <b-dropdown-item>{{this.userTypes[0]}}</b-dropdown-item>
            <b-dropdown-item>{{this.userTypes[1]}}</b-dropdown-item>
          </b-dropdown>
          <b-button variant="info" @click="submitForm">Submit</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "newUser",
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      userTypes: this.users,
      userObj: {
        user: null,
        pass: null,
        fname: null,
        lname: null,
        email: null,
        phone: null,
        phone2: null,
        dob: null,
        usertypeid: null,
        address: {
          street: null,
          street2: null,
          city: null,
          state: null,
          country: null,
          zipcode: null
        }
      }
    };
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.userid) {
        this.errors.push("First Name required.");
      }
      if (!this.fname) {
        this.errors.push("First Name required.");
      }
      if (!this.lname) {
        this.errors.push("Last Name required.");
      }
      if (!this.user) {
        this.errors.push("User Name required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if (!this.phone) {
        this.errors.push("Phone required.");
      }
      if (this.pass !== this.pass2) {
        this.errors.push("Passwords don't match.");
      }
      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submitForm: function() {
      let createUrl = process.env.VUE_APP_USER_CREATE;
      this.axios.post(createUrl, this.userObj).then(function() {});
      this.$router.push({ name: "user" });
    }
  }
};
</script>

<style scoped>
.userform {
  width: 30%;
  margin: 3% auto;
}
.input {
  margin: 10px auto;
}
</style>
