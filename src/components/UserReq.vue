<template>
  <div class="accreq">
<!--    <div>-->
<!--      <b-card class="container">-->
<!--        <b-card-text>All Requests Taken Care Of!</b-card-text>-->
<!--        <b-button @click="getRequests" variant="primary">Refresh</b-button>-->
<!--      </b-card>-->
<!--    </div>-->
    <div>
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
          <b-button variant="primary" @click="accApprove(data.index)">Approve</b-button>
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
          dummy : 1
        }
      ]
    };
  },
  methods: {
    getRequests: function() {
      let accList = process.env.VUE_APP_ACC_REQ;
      this.axios.get(accList).then(response => {
        console.log(response.data);
        if(response.data !== [])
        {
          this.accItems = response.data;
          this.totalRows = this.accItems.length;
        }
      });
      // this.$refs.table.refresh();
    },
    updateField: function() {
      var field = Object.keys(this.accItems[0]);
      if(this.accItems !== [])
      {
        field.push("Approve", "Decline");
        return field;
      }
    },
    accApprove: function(i) {
      var id = this.accItems[i].bankingAccountId;
      this.accItems.splice(i,1);
      let approve = process.env.VUE_APP_ACC_REQ_APPROVE + id;
      this.axios.get(approve).then(function() {});
      //this.$refs.table.refresh();
    },
    accDecline: function(i) {
      var id = this.accItems[i].bankingAccountId;
      this.accItems.splice(i,1);
      let decline = process.env.VUE_APP_ACC_REQ_DECLINE + id;
      this.axios.get(decline).then(function() {});
      //this.$refs.table.refresh();
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