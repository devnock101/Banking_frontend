<template>
  <div class="log container">
    <b-card class="users" header="System Log" header-bg-variant="dark" header-text-variant="light">
      <b-table
        class="table"
        striped
        outlined
        hover
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :items="logData"
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
  name: "log",
  mounted: function() {
    this.getLog();
  },
  props: {
    userid: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      isBusy: false,
      id: this.userid,
      perPage: 5,
      currentPage: 1,
      totalRows: "",
      logData: [
        {
          isActive: true,
          id: 1,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald"
        }
      ]
    };
  },
  methods: {
    getLog: function() {
      this.toggleBusy();
      let logUrl = process.env.VUE_APP_USER_LOG + this.id ;
      this.axios.get(logUrl).then(response => {
        this.logData = response.data;
        this.totalRows = this.logData.length;
      });
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