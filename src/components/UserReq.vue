<template>
  <div class="accreq">
    <b-table
      ref="table"
      striped
      hover
      outlined
      responsive
      :per-page="perPage"
      :current-page="currentPage"
      :fields="updateField()"
      :items="accItems"
    >
      <template slot="Approve" slot-scope="data">
        <b-button variant="primary" @click="Approve(data.index)">Approve</b-button>
      </template>
      <template slot="Decline" slot-scope="data">
        <b-button variant="primary" @click="accDecline(data.index)">Decline</b-button>
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
  </div>
</template>

<script>
export default {
  name: "userreq",
  mounted: function() {
    this.getRequests();
  },
  data: function() {
    return {
      isBusy: false,
      userid: null,
      perPage: 6,
      currentPage: 1,
      totalRows: "",
      accItems: [
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
    getRequests: function() {
      let accList = process.env.VUE_APP_ACC_REQ;
      this.axios.get(accList).then(response => {
        this.accItems = response.data;
      });
      this.totalRows = this.accItems.length;
      this.$refs.table.refresh();
    },
    updateField: function() {
      var field = Object.keys(this.accItems[0]);
      field.push("Approve", "Decline");
      return field;
    },
    accApprove: function(i) {
      var id = this.accItems.splice(i, 1).bankingAccountId;
      let approve = process.env.VUE_APP_ACC_REQ_APPROVE + id;
      this.axios.put(approve).then(function() {});
      this.$refs.table.refresh();
    },
    accDecline: function(i) {
      var id = this.accItems.splice(i, 1).bankingAccountId;
      let decline = process.env.VUE_APP_ACC_REQ_DECLINE + id;
      this.axios.put(decline).then(function() {});
      this.$refs.table.refresh();
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