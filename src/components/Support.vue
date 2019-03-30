<!--
    Author: Akshay Rao Arun Kumar
    Component: ScheduleAppointment.vue
    Purpose: Used to enter appointment details in a form
-->

<template>
  <div class="container">
    <b-card
      class="text-center"
      header="Schedule Appointment"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-card-sub-title>Enter the Appointment details</b-card-sub-title>

      <b-card-body>
        <div class="form-row">
          <div class="col-6">
            <input type="text" v-model="firstname" class="form-control" placeholder="First name">
          </div>
          <div class="col-6">
            <input type="text" v-model="lastname" class="form-control" placeholder="Last name">
          </div>
        </div>
        <br>
        <div class>
          <b-form-textarea
            rows="3"
            max-rows="6"
            type="text"
            v-model="postBody.reason"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Enter the reason for appointment"
          ></b-form-textarea>
        </div>
        <br>
        <b-container>
          <b-row>
            <b-col>
              <label>Enter Date</label>
              <b-form-input type="date" v-model="postBody.appointmentDate"></b-form-input>
            </b-col>
            <b-col>
              <label>Enter Time</label>
              <b-form-input type="time" v-model="postBody.appointmentTime"></b-form-input>
            </b-col>
          </b-row>
        </b-container>
        <!--div class="form-row">

                        <div class="    ">
                            <label>Enter Date</label>
                            <input type="date" class="form-control" placeholder="time" id="formGroupExampleInput4" v-model="postBody.appointmentDate">

                            <label>Enter Date</label>
                            <input type="time"  class="form-control" placeholder="Last name" v-model="postBody.appointmentTime">
                        </div>
        </div-->
        <br>

        <div>
          <b-button v-on:click="this.postAppointment" block variant="primary">Request Appointment</b-button>
        </div>
        <!-- <b-card-subtitle v-if="this.errorMessage===''"></b-card-subtitle>
        <b-card-subtitle v-else>{{this.errorMessage}}</b-card-subtitle>-->
      </b-card-body>
    </b-card>
  </div>
</template>
<!--<script src="src/keyboard.js"></script>-->
<script>
export default {
  name: "support",
  data() {
    return {
      postBody: {
        userId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: ""
      },
      firstname: "",
      lastname: ""
      //   ,errorMessage: ""
    };
  },
  methods: {
    postAppointment() {
      console.log(this.postBody.appointmentTime);
      console.log(this.postBody.appointmentDate);
      let hours = parseInt(this.postBody.appointmentTime.split(":")[0], 10);
      //   let mins = this.postBody.appointmentTime.split(":")[0];
      console.log("hours " + hours);
      //   if (hours < 9 || hours > 17) {
      //     errorMessage = "Please enter time between 9AM - 5PM";
      //     console.log("2");
      //   } else {
      //     console.log("1");
      //     let helpDetails = process.env.VUE_APP_HELP_APPOINT;
      //     this.axios.post(helpDetails, this.postBody).then(function() {});
      //   }
    }
  }
};
</script>

<style scoped>
</style>