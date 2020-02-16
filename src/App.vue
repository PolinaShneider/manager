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
          v-on:delete-user="deleteUser"
          slot="middle"
          :loading="isLoading"
          :users="searchResult"
          :keyword="keyword"
      ></ListWrapper>
      <DialogContainer slot="middle" :visible="isEdited">
        <Dialog
            v-on:update-record="updateRecord"
            v-on:add-user="addUser"
            v-on:close-dialog="closeDialog"
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
            deleteUser: function (val) {
                if (!val) {
                    return;
                }

                const {
                    currentUser: user
                } = val;

                try {
                    this.$db.collection('users').doc(user.id).delete();
                    this.$notifier.show({
                        message: `User ${user.name} was successfully deleted`,
                        style: 'success'
                    });
                    this.fetchUsers();
                } catch (e) {
                    this.$notifier.show({
                        message: `Couldn't delete user ${user.name}`,
                        style: 'error'
                    })
                }
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
            closeDialog: function () {
                this.currentUser = null;
                this.isEdited = false;
            },
            updateRecord: function ({user}) {
                const toAdd = !user.id;
                let message;

                try {
                    if (toAdd) {
                        this.$db.collection('users').add({
                            ...user,
                            date: Date.now()
                        })
                    } else {
                        this.$db.collection('users').doc(user.id).update({
                            ...user
                        });
                    }

                    message = toAdd ?
                        `User ${user.name} was successfully added` :
                        `User ${user.name} was successfully updated`;

                    this.$notifier.show({
                        message,
                        style: 'success'
                    });
                } catch (e) {
                    message = toAdd ?
                        `Couldn't add user ${user.name}` :
                        `Couldn't update user ${user.name}`;

                    this.$notifier.show({
                        message,
                        style: 'success'
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
                    .orderBy('date', 'desc')
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
