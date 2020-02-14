<template>
  <div class="list-wrapper">
    <div v-if="!loading" class="list-wrapper-content">
      <div class="no-data" v-if="users.length === 0">Nothing found</div>
      <ul class="list" v-else>
        <li class="list__item" v-for="(user, i) in users" :key="i">
          <div v-for="(value, name, index) in getValues(user)" :key="index">
            <div><b>{{getLabel(name)}}</b></div>
            <div>{{value}}</div>
          </div>
          <i class="fas fa-pencil-alt" v-on:click="edit($event, user)"></i>
        </li>
      </ul>
    </div>
    <div class="loader-container" v-else>
      <span id="loading"></span>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            msg: String,
            users: Array,
            keyword: String,
            loading: Boolean
        },
        methods: {
            getLabel: function (key) {
                return this.$dictionary[this.keyword][key]
            },
            getValues: function(user) {
                return {
                    name: user.name,
                    surName: user.surName,
                    login: user.login
                }
            },
            edit: function (event, item) {
                this.$emit('edit-user', {isEdited: true, currentUser: item});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    text-align: initial;
  }

  .list {
    margin-top: 20px;
    border-radius: 4px;
    flex-grow: 1;
    height: 325px;
    overflow: scroll;
    background: #FFFFFF;
  }

  .no-data, .loader-container {
    height: 325px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .list-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .list-wrapper-content {
    width: 100%;
  }

  .list__item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border: 1px solid rgb(128, 128, 128);
  }

  .list__item:hover {
    background: #eeeeee;
    cursor: pointer;
  }

  .list__item:not(:first-of-type) {
    border-top: 0;
  }

  .list__item div {
    margin-right: 20px;
    width: calc(25% - 20px);
  }

  .list__item i {
    cursor: pointer;
  }

  .list__item label {
    font-weight: bold;
  }

  #loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid sandybrown;
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
