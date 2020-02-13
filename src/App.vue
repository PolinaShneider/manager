<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Layout>
      <SearchInput v-on:search-result="displaySearch" slot="content" :data="users"></SearchInput>
      <List v-on:edit-user="editUser" slot="content" :loading="isLoading" :users="searchResult"
            :keyword="'users'"></List>
      <DialogContainer slot="content" :visible="isEdited">
        <Dialog v-on:update-user="updateUser" :user="currentUser"></Dialog>
      </DialogContainer>
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
            editUser: function (val) {
                if (!val) {
                    return;
                }
                const {currentUser: user, isEdited: edited} = val;
                this.currentUser = user;
                this.isEdited = edited;
            },
            updateUser: function ({user}) {
                const db = this.$firebase.firestore();
                db.collection('users').doc(user.id).update({
                    ...user
                });
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
                            return {...doc.data(), id: doc.id}
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
                isLoading: true
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
