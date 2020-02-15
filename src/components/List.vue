<template>
  <div>
    <table v-if="users.length" class="table">
      <thead>
      <tr>
        <th v-for="(value, key, index) in getDisplayFields(users[0])" :key="index">{{$getLabel(keyword, key)}}</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, i) in users" :key="i">
        <td v-for="(value, key, index) in getDisplayFields(user)" :key="index">
          {{value}}
        </td>
        <td>
          <i class="fas fa-pencil-alt" v-on:click="edit($event, user)"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            users: Array,
            keyword: String,
            loading: Boolean
        },
        methods: {
            getDisplayFields: function (user) {
                return {
                    name: user.name,
                    surName: user.surName,
                    login: user.login
                }
            },
            edit: function (event, item) {
                this.$parent.$emit('edit-user', {
                    currentUser: item
                });
            }
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
    margin-left: 40px;
  }
</style>
