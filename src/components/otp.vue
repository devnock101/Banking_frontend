
<template>
    <div>
        <b-card
                class="users"
                header="Transaction History"
                header-bg-variant="dark"
                header-text-variant="light"
        >

            <b-button @click="this.getOtp" variant="primary"> Get Bank Statement</b-button>
            <input type="number" v-model="enteredotp" id="pass" minlength="4" required>
            <b-button @click="this.submitOtp" variant="primary">Submit OTP</b-button>

        </b-card>
    </div>
</template>



<script>
    export default {
        data: function () {
            return {
                isAuthorized: false,
                enteredotp: '',
                otpDetails:{
                    optRequestId: '',
                    otp: '',
                    userId: '',
                    status: ''
                },
            };
        },
        methods: {
            getOtp: function () {
                console.log("URL has been hit1");
                let Url = process.env.VUE_APP_OTP;
                this.axios.get(Url).then(function (response) {
                    this.otpDetails = response.data;
                });
                console.log("URL has been hit2");
            },
            submitOtp: function () {
                console.log("Download URL has been hit3");
                let otpUrl = process.env.VUE_APP_OTP + this.otpDetails.optRequestId + "/" + this.enteredotp;
                this.axios.get(otpUrl).then(function (response) {
                    this.isAuthorized = response.data;
                });
                console.log("Download URL has been hit4");
                if (this.isAuthorized == true) {

                }
            }
        }
    }
</script>
