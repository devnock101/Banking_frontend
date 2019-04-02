<template>
  <div class="container d-flex">
    <div v-if="userId !== null" class="userform container">
      <b-card header="Account Details" header-bg-variant="dark" header-text-variant="light">
        <b-table class="table" striped stacked outlined :items="details"></b-table>
      </b-card>
    </div>
    <div class="userform container">
      <b-card no-body border-variant="light">
        <b-form>
          <div class="d-flex">
            <b-input
              id="fname"
              class="input1"
              type="text"
              v-model="obj.userObj.firstname"
              placeholder="First Name"
            />
            <b-input
              id="lname"
              class="input2"
              type="text"
              v-model="obj.userObj.lastname"
              placeholder="Last name"
            />
          </div>
          <div class="d-flex">
            <b-input
              v-if="this.userId === null"
              id="user"
              type="text"
              class="input1"
              v-model="obj.userObj.user"
              placeholder="Username"
            />
            <b-form-select
              v-model="obj.userObj.usertypeid"
              class="input2"
              :options="this.userTypes"
            >
              <template slot="first">
                <option :value="null" disabled>Please select a user type</option>
              </template>
            </b-form-select>
          </div>
          <div class="d-flex">
            <b-input
              v-if="this.userId === null"
              id="pass"
              v-model="obj.userObj.pass"
              class="input1"
              type="password"
              name="pass"
              placeholder="Password"
            />
            <b-input
              v-if="this.userId === null"
              id="pass2"
              v-model="pass2"
              type="password"
              name="pass_verify"
              placeholder="Verify Password"
              class="input2"
            />
          </div>
          <div class="d-flex">
            <b-input
              name="date_between_field"
              type="date"
              v-model="obj.userObj.dob"
              class="input1"
              placeholder=" Date of Birth"
            />
            <b-input
              id="email"
              class="input2"
              v-model="obj.userObj.email"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div class="d-flex">
            <b-input
              id="phone"
              v-model.number="obj.userObj.phone"
              class="input1"
              type="tel"
              name="phone"
              placeholder="Phone"
            />
            <b-input
              id="phone2"
              v-model.number="obj.userObj.phone2"
              type="tel"
              class="input2"
              name="phone2"
              placeholder="Alternate Phone"
            />
          </div>
          <div class="d-flex">
            <b-input
              id="street"
              v-model="obj.addressObj.street"
              type="text"
              class="input1"
              name="street"
              placeholder="Street Address"
            />
            <b-input
              id="street2"
              v-model="obj.addressObj.street2"
              type="text"
              class="input2"
              name="street2"
              placeholder="Street Address (Optional)"
            />
          </div>
          <div class="d-flex">
            <b-input
              id="city"
              v-model="obj.addressObj.city"
              type="text"
              class="input1"
              name="city"
              placeholder="Town/City"
            />
            <b-input
              id="state"
              v-model="obj.addressObj.state"
              type="text"
              class="input2"
              name="state"
              placeholder="State"
            />
          </div>
          <div class="d-flex">
            <b-input
              id="country"
              v-model="obj.addressObj.country"
              type="text"
              class="input1"
              name="country"
              placeholder="Country"
            />
            <b-input
              id="zipcode"
              v-model.number="obj.addressObj.zipcode"
              type="text"
              class="input2"
              name="zip"
              placeholder="Zip Code"
            />
          </div>
          <b-button variant="primary" class="input3" @click="submitForm">Add</b-button>
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
    },
    id: {
      type: Number,
      required: false
    }
  },
  mounted: function() {
    this.getDetails();
  },
  data() {
    return {
      userTypes: this.users,
      userId: this.id,
      details: [
        {
          Name: "Abhinav Mishra",
          Customer_Account_Id: "555 77 854",
          SSN: "374 234 2855",
          Account_Balance: "$1200"
        }
      ],
      pass2: null,
      obj: {
        userObj: {
          user: null,
          pass: null,
          firstname: null,
          lastname: null,
          email: null,
          phone: null,
          phone2: null,
          dob: null,
          usertypeid: null
        },
        addressObj: {
          street: null,
          street2: null,
          city: null,
          state: null,
          country: null,
          zipcode: null
        }
      },
      temp: {}
    };
  },
  methods: {
    getDetails: function() {
      if(this.userId)
      {
        let userDetails = process.env.VUE_APP_USER + this.userId;
        this.axios.get(userDetails).then(response => {
          this.obj.userObj = response.data;
          if(this.obj.userObj.usertypeid === "ROLE_CUSTOMER") {
            this.obj.userObj.usertypeid = "ROLE_CUSTOMER";
          } else if (this.obj.userObj.usertypeid === "ROLE_MERCHANT") {
            this.obj.userObj.usertypeid = "ROLE_MERCHANT";
          }
          this.temp = { ...this.obj.userObj, ...this.obj.addressObj };
          this.details = [];
          this.details.push(this.temp);
        });
      }
    },
    checkForm: function(e) {
      this.errors = [];
      if (!this.userid) {
        this.errors.push("First Name required.");
      }
      if (!this.obj.userObj.firstname) {
        this.errors.push("First Name required.");
      }
      if (!this.obj.userObj.lastname) {
        this.errors.push("Last Name required.");
      }
      if (!this.obj.userObj.user) {
        this.errors.push("User Name required.");
      }
      if (!this.obj.userObj.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if (!this.obj.userObj.phone) {
        this.errors.push("Phone required.");
      }
      if (this.obj.userObj.pass !== this.obj.userObj.pass2) {
        this.errors.push("Passwords don't match.");
      }
      if (!this.errors.length) {
        this.submitForm();
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
      this.axios.post(createUrl, this.obj).then(function() {});
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
.input3 {
  margin: 7px auto;
}
</style>
