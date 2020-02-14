<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Layout>
      <SearchInput v-on:search-result="displaySearch" slot="content" :data="users"></SearchInput>
      <button class="btn btn-success mt-3" slot="content" v-on:click="addUser">Add user</button>
      <List v-on:edit-user="editUser" slot="content" :loading="isLoading" :users="searchResult"
            :keyword="'users'"></List>
      <DialogContainer slot="content" :visible="isEdited">
        <Dialog
            v-on:update-user="updateUser"
            v-on:add-user="addUser"
            :user="currentUser"
            :is-new="isNew"
            :logins="users.map(el => el.login)"
        ></Dialog>
      </DialogContainer>x
    </Layout>
  </div>
</template>

<script>
    import Layout from "./components/Layout";
    import List from "./components/List";
    import Dialog from "./components/Dialog";
    import DialogContainer from "./components/DialogContainer";
    import SearchInput from "./components/SearchInput";

    export default {
        name: 'App',
        components: {
            Layout,
            List,
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
                const {currentUser: user, isEdited: edited} = val;
                this.currentUser = user;
                this.isEdited = edited;
                this.isNew = false;
            },
            updateUser: function ({user}) {
                const db = this.$firebase.firestore();
                const toAdd = !user.id;

                if (toAdd) {
                    db.collection('users').add({
                        ...user
                    })
                } else {
                    db.collection('users').doc(user.id).update({
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
                const db = this.$firebase.firestore();
                db.collection('users')
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
                isNew: false
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
