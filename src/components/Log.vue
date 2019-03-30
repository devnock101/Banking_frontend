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
      type: String,
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
    getLog: function() {
      this.toggleBusy();
      let logUrl =
        process.env.VUE_APP_USER +
        this.id +
        process.env.VUE_APP_USER_LOG +
        "50";
      this.axios.get(logUrl).then(response => {
        this.logData = response.data;
        //CHANGED THIS
      });
      this.totalRows = this.logData.length;
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