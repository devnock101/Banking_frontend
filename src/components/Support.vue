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
<!--        <div class="form-row">-->
<!--          <div class="col-6">-->
<!--            <input type="text" v-model="firstname" class="form-control" placeholder="First name">-->
<!--          </div>-->
<!--          <div class="col-6">-->
<!--            <input type="text" v-model="lastname" class="form-control" placeholder="Last name">-->
<!--          </div>-->
<!--        </div>-->
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
              <b-form-input type="date" v-model="postBody.appointmentdate"></b-form-input>
            </b-col>
            <b-col>
              <label>Enter Time</label>
              <b-form-input type="time" v-model="postBody.appointmenttime"></b-form-input>
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
          <p>Getting an appointment requires OTP. Please click on Request Appointment and submit otp received on your email</p>
        <div class="userform container d-flex">

            <b-button class="input1" @click="this.getOtp" variant="primary"> Request Appointment</b-button>
            <input class="input3" type="text" v-model="enteredOtp" id="pass" minlength="4" required>
            <b-button class="input2" @click="this.submitOtp" variant="primary">Submit OTP</b-button>
            <div class="simple-keyboard"></div>
        </div>


        <div>
          <!--b-button v-on:click="this.postAppointment" block variant="primary">Request Appointment</b-button-->
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
    props: {
      userId: {
          type: Number,
          required: true
      }
    },
  data() {
    return {
      // otpDetails:{
      //     createBy: null,
      //     lastModifiedBy: null,
      //     createdAt: null,
      //     lastModifiedAt: null,
      //     optRequestId: null,
      //     userId: null,
      //     status: null,
      //     otp: null
      //
      // },
        enteredOtp: null,
        optRequestId: null,
      postBody: {
        userid: this.userId,
        appointmentdate: '',
        appointmenttime: '',
        reason: '',
        status: ''

      },
      firstname: "",
      lastname: ""
      //   ,errorMessage: ""
    };
  },
  methods: {
    postAppointment() {
      console.log(this.postBody.appointmenttime);
      console.log(this.postBody.appointmentdate);
      let hours = parseInt(this.postBody.appointmenttime.split(":")[0], 10);

      console.log("hours " + hours);
      console.log(this.postBody);
          let helpDetails = process.env.VUE_APP_HELP_APPOINT;
          this.axios.post(helpDetails, this.postBody);
    },
    getOtp: function(){

      let Url = process.env.VUE_APP_OTP;
      this.axios.get(Url).then(response => {
          this.optRequestId = response.data;
      });

    },
    submitOtp: function(){
        console.log("OptRequestId" + this.optRequestId);
      let otpUrl = process.env.VUE_APP_OTP + "/" + this.optRequestId + "/" + this.enteredOtp;
      this.axios.get(otpUrl).then(response =>{
          if(response.data == true){
              console.log("Appointment validated")
            this.postAppointment();

          }
      });

    }
  }
};
</script>

<style scoped>
    .userform {
        width: 60%;
        margin: 3% auto;
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
