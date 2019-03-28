<template>
  <div class="user_accounts container">
    <b-card
      class="users"
      header="Employee Accounts"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-button class="btn" variant="info">Create New User</b-button>
      <b-table
        class="table"
        striped
        outlined
        hover
        :per-page="10"
        :fields="updateField()"
        :items="accounts"
        @row-clicked="loadAccount()"
      >
        <template slot="Modify" slot-scope="data">
          <b-link :to="{name: 'edit', params: {id: data.item.id, action: 'modify'}}">
            <b-button variant="info">Modify</b-button>
          </b-link>
        </template>
        <template slot="Delete" slot-scope="data">
          <b-button variant="info" @click="accDelete(data.item.id)">Delete</b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "user_accounts",
  mounted: function() {
    this.getUsers();
  },
  data: function() {
    return {
      isBusy: false,
      accounts: [
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
        }
      ]
    };
  },
  methods: {
    getUsers: function() {
      let accountList = process.env.VUE_APP_USER_LIST;
      this.axios.get(accountList).then(function(response) {
        this.accounts = response.body.users;
      });
      this.toggleBusy();
    },
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    accDelete: function(id) {
      let deleteUrl = process.env.VUE_APP_USER + id;
      this.axios
        .delete(deleteUrl)
        .then(function(response) {
          if (response.status === 200 || response.status === 204) {
            console.log("Success!");
          }
        })
        .catch(function(error) {
          this.error = error;
        });
    },
    updateField: function() {
      var field = Object.keys(this.accounts[0]);
      field.push("Modify", "Delete");
      return field;
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