<template>
  <div>
    <div v-if="!loading">
      <List v-if="users.length" :users="users" :keyword="keyword"></List>
      <div v-else class="alert alert-success text-center">
        Nothing found
      </div>
    </div>
    <Loader v-else></Loader>
  </div>
</template>

<script>
  import Loader from "./Loader";
  import List from "./List";
    export default {
        name: 'ListWrapper',
        components: {
            Loader,
            List
        },
        props: {
            users: Array,
            keyword: String,
            loading: Boolean
        }
    }
</script>

<style scoped>
  * {
    text-align: initial;
  }

  tr:hover {
    background: #eeeeee;
    cursor: pointer;
  }

  .table td {
    width: 25%;
  }

  .table td i {
    margin-left: 50px;
  }
</style>
