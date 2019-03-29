<template>
  <div class="transactions container">
    <b-card
      class="users"
      header="Transaction History"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-table
        ref="table"
        class="table"
        striped
        outlined
        hover
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :items="transaction"
      />
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
    </b-card>
  </div>
</template>

<script>
export default {
  name: "transactions",
  created: function() {
    this.getTransactions();
  },
  data: function() {
    return {
      isBusy: false,
      perPage: 5,
      currentPage: 1,
      totalRows: "",
      transaction: [
        {
          isActive: true,
          id: 1,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        {
          isActive: false,
          id: 2,
          age: 21,
          first_name: "Larsen",
          last_name: "Shaw"
        },
        {
          isActive: false,
          id: 3,
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson"
        },
        {
          isActive: true,
          id: 4,
          age: 38,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 5,
          age: 38,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 6,
          age: 38,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 7,
          age: 38,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 8,
          age: 38,
          first_name: "Jami",
          last_name: "Carney"
        },
        {
          isActive: true,
          id: 9,
          age: 38,
          first_name: "Jami",
          last_name: "Carney"
        }
      ]
    };
  },
  methods: {
    getTransactions: function() {
      this.toggleBusy();
      let transList = process.env.VUE_APP_TRANS_LIST;
      this.axios.get(transList).then(response => {
        this.transactions = response.body.transactions;
      });
      this.totalRows = this.transaction.length;
      this.$refs.table.refresh();
      this.toggleBusy();
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
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