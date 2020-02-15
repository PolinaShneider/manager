<template>
  <div id="app">
    <Layout>
      <img alt="Vue logo" slot="top" src="./assets/logo.png">
      <SearchInput
          v-on:search-result="displaySearch"
          slot="top"
          :data="users"
      ></SearchInput>
      <button
          class="btn btn-success mt-3"
          slot="top"
          v-on:click="addUser"
      >
        Add user
      </button>
      <ListWrapper
          v-on:edit-user="editUser"
          slot="middle"
          :loading="isLoading"
          :users="searchResult"
          :keyword="keyword"
      ></ListWrapper>
      <DialogContainer slot="middle" :visible="isEdited">
        <Dialog
            v-on:update-record="updateRecord"
            v-on:add-user="addUser"
            :user="currentUser"
            :keyword="keyword"
            :is-new="isNew"
            :logins="users.map(el => el.login)"
        ></Dialog>
      </DialogContainer>
    </Layout>
  </div>
</template>

<script>
    import Dialog from "./components/Dialog";
    import DialogContainer from "./components/DialogContainer";
    import Layout from "./components/Layout";
    import ListWrapper from "./components/ListWrapper";
    import SearchInput from "./components/SearchInput";

    export default {
        name: 'App',
        components: {
            Layout,
            ListWrapper,
            DialogContainer,
            Dialog,
            SearchInput
        },
        methods: {
            addUser: function () {
                this.currentUser = {
                    name: '',
                    surName: '',
                    login: ''
                };
                this.isNew = true;
                this.isEdited = true;
            },
            editUser: function (val) {
                if (!val) {
                    return;
                }
                const {
                    currentUser: user
                } = val;
                this.currentUser = user;
                this.isEdited = true;
                this.isNew = false;
            },
            updateRecord: function ({user}) {
                const toAdd = !user.id;

                if (toAdd) {
                    this.$db.collection('users').add({
                        ...user
                    })
                } else {
                    this.$db.collection('users').doc(user.id).update({
                        ...user
                    });
                }
                this.currentUser = null;
                this.isEdited = false;
                this.fetchUsers();
            },
            displaySearch: function (val) {
                this.searchResult = val;
            },
            fetchUsers: function () {
                this.$db.collection('users')
                    .get()
                    .then(({docs}) => {
                        this.users = Array.from(docs).map(doc => {
                            return {
                                ...doc.data(),
                                id: doc.id
                            }
                        });
                        this.isLoading = false;
                    });
            }
        },
        data: () => {
            return {
                currentUser: null,
                isEdited: false,
                users: [],
                searchResult: [],
                isLoading: true,
                isNew: false,
                keyword: 'users'
            }
        },
        mounted() {
            this.fetchUsers()
        }
    }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
