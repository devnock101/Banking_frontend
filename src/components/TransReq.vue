<template>
  <div class="transreq container">
    <b-card
      class="users"
      header="Transactions Requests"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-button class="btn" variant="info">Create Transaction</b-button>
      <b-table striped hover outlined :per-page="10" :fields="updateField()" :items="transItems">
        <template slot="Approve" slot-scope="data">
          <b-button variant="info" @click="transApprove(data.item.id)">Approve</b-button>
        </template>
        <template slot="Decline" slot-scope="data">
          <b-button variant="info" @click="trtansDecline(data.item.id)">Decline</b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "transreq",
  mounted: function() {
    this.getTransactions();
  },
  data: function() {
    return {
      isBusy: false,
      transItems: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        {
          isActive: false,
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson"
        },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  },
  methods: {
    getTransactions: function() {
      let transList = process.env.VUE_APP_TRANS_REQUEST_LIST;
      this.axios.get(transList).then(function(response) {
        this.transItems = response.body.transactions;
      });
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    updateField: function() {
      var field = Object.keys(this.transItems[0]);
      field.push("Approve", "Decline");
      return field;
    },
    transApprove: function() {
      let approve = process.env.VUE_APP_TRANS_REQUEST_APPROVE;
      this.axios.put(approve).then(function() {});
    },
    transDecline: function() {
      let decline = process.env.VUE_APP_TRANS_REQUEST_DECLINE;
      this.axios.put(decline).then(function() {});
    }
  }
};
</script>

<style scoped>
.users {
  margin: 5% auto;
}
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