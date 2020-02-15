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
          <i class="fas fa-pencil-alt" v-on:click="editItem($event, user)"></i>
          <i class="fas fa-times" v-on:click="deleteItem($event, user)"></i>
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
            editItem: function (event, item) {
                this.$parent.$emit('edit-user', {
                    currentUser: item
                });
            },
            deleteItem: function (event, item) {
                this.$notifier.show({
                    message: `Delete user ${item.name}?`,
                    type: 'confirm',
                    okText: 'Yes, go ahead',
                    cancelText: 'Oh, wait',
                    okHandler: () => {
                        this.$parent.$emit('delete-user', {
                            currentUser: item
                        });
                    }
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
    margin: 0 15px 0 10px;
  }
</style>
