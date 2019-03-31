<template>
  <div class="transreq container">
    <b-card
      class="users"
      header="Transactions"
      header-bg-variant="dark"
      header-text-variant="light"
      no-body
    >
      <b-tabs card pills content-class="mt-3">
        <b-tab title="View Requests" active>
          <b-table
            ref="table"
            striped
            hover
            outlined
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :fields="updateField()"
            :items="transItems"
          >
            <template slot="Approve" slot-scope="data">
              <b-button variant="primary" @click="transApprove(data.index)">Approve</b-button>
            </template>
            <template slot="Decline" slot-scope="data">
              <b-button variant="primary" @click="transDecline(data.index)">Decline</b-button>
            </template>
          </b-table>
          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
                class="my-0"
              />
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Create Transaction">
          <Trans v-if="this.userTest()"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Trans from "@/components/TransForm.vue";

export default {
  name: "transreq",
  mounted: function() {
    this.getTransactions();
  },
  components: {
    Trans
  },
  props: {
    userType: {
      type: String,
      required: true
    },
    userId: {
      type: String
    }
  },
  data: function() {
    return {
      isBusy: false,
      userid: null,
      action: "transaction",
      user: this.userType,
      id: this.userId,
      perPage: 8,
      currentPage: 1,
      totalRows: "",
      transItems: [
        {
          isActive: true,
          id: 1,
          age: 40,
          amount: 300,
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        {
          isActive: false,
          id: 2,
          age: 21,
          amount: 1300,
          first_name: "Larsen",
          last_name: "Shaw"
        },
        {
          isActive: false,
          id: 3,
          age: 89,
          amount: 300,
          first_name: "Geneva",
          last_name: "Wilson"
        },
        {
          isActive: true,
          id: 4,
          age: 38,
          amount: 300,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 5,
          age: 38,
          amount: 1300,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 6,
          age: 38,
          amount: 300,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 7,
          age: 38,
          amount: 1300,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 8,
          age: 38,
          amount: 300,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 9,
          age: 38,
          amount: 1300,
          first_name: "Jami",
          last_name: "Carney"
        }
      ]
    };
  },
  methods: {
    getTransactions: function() {
      this.toggleBusy();
      let transList = process.env.VUE_APP_TRANS_REQUEST_LIST + "PENDING";
      this.axios.get(transList).then(response => {
        this.transItems = response.data;
      });
      this.totalRows = this.transItems.length;
      this.$refs.table.refresh();
      this.toggleBusy();
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    updateField: function() {
      var field = Object.keys(this.transItems[0]);
      field.push("Approve", "Decline");
      return field;
    },
    transApprove: function(i) {
      var id = this.transItems.splice(i, 1).transactionId;
      let approve =
        process.env.VUE_APP_TRANS_REQUEST_APPROVE +
        "?List_transactionID={" +
        id +
        "}";
      this.axios.put(approve).then(function() {});
      this.$refs.table.refresh();
    },
    transDecline: function(i) {
      var id = this.transItems.splice(i, 1).transactionId;
      let decline =
        process.env.VUE_APP_TRANS_REQUEST_DECLINE +
        "?List_transactionID={" +
        id +
        "}";
      this.axios.put(decline).then(function() {});
      this.$refs.table.refresh();
    },
    userTest: function() {
      return (
        this.user === "ROLE_TIER1" ||
        this.user === "ROLE_TIER2" ||
        this.user === "ROLE_CUSTOMER" ||
        this.user === "ROLE_MERCHANT"
      );
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