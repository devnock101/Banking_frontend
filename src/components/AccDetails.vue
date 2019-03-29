<template>
  <div class="acc_details container">
    <b-card
      class="users"
      header="Account Details"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-table class="table" striped stacked outlined :items="details"></b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "acc_details",
  created: function() {
    this.getDetails();
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      isBusy: false,
      userid: this.userId,
      items: {
        Name: "Abhinav Mishra",
        Customer_Account_Id: "555 77 854",
        SSN: "374 234 2855",
        Account_Balance: "$1200"
      },
      details: [
        {
          Name: "Abhinav Mishra",
          Customer_Account_Id: "555 77 854",
          SSN: "374 234 2855",
          Account_Balance: "$1200"
        }
      ]
    };
  },
  methods: {
    getDetails: function() {
      this.toggleBusy();
      let userDetails = process.env.VUE_APP_USER + this.userid;
      this.axios.get(userDetails).then(response => {
        this.items = response.body.user;
      });
      this.details = [];
      this.details.push(this.items);
      this.toggleBusy();
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    accClose: function(id) {
      let closeUrl = process.env.VUE_APP_USER + id;
      this.axios.delete(closeUrl).then(function() {});
    }
  }
};
</script>

<style scoped>
.accounts {
  max-height: 25%;
  overflow: scroll;
}
.users {
  margin: 5% auto;
}
.btn {
  margin: 0px 10px 20px;
}
table.b-table[aria-busy="false"] {
  opacity: 1;
}
table.b-table[aria-busy="true"] {
  opacity: 0.6;
}
</style>