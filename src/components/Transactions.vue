<template>
  <div class="transactions container">
    <b-card
      class="users"
      header="Transaction History"
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-table class="table" striped outlined hover :per-page="10" :items="transactions"/>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "transactions",
  data: function() {
    return {
      transactions: [
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