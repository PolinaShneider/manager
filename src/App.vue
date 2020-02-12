<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <Layout>
            <SearchInput v-on:search-result="displaySearch" slot="content" :data="users"></SearchInput>
            <List v-on:edit-user="logger" slot="content" :loading="isLoading" :users="searchResult" :keyword="'users'"></List>
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
    import {getUsers} from "./main";

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
            logger: function (val) {
                if (!val) {
                    return;
                }
                const {currentUser: user, isEdited: edited} = val;
                this.currentUser = user;
                this.isEdited = edited;
            },
            updateUser: function () {
                this.users.push({name: 'Rabia', surName: 'Khamuda', login: 'rabi'});
            },
            displaySearch: function (val) {
                console.log(val)
                this.searchResult = val;
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
            getUsers().then(result => {
                return result
            }).then(user => {
                this.isLoading = false;
                this.users = user;
            })
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
