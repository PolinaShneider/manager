<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <Layout>
            <List v-on:edit-user="logger" slot="content" :users="users" :keyword="'users'"></List>
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

    export default {
        name: 'App',
        components: {
            Layout,
            List,
            DialogContainer,
            Dialog
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
            }
        },
        data: () => {
            return {
                currentUser: null,
                isEdited: false,
                users: [
                    {
                        name: "Anya",
                        surName: "Vasilkova",
                        login: "query"
                    },
                    {
                        name: "Vasya",
                        surName: "Sopelkin",
                        login: "soplo"
                    },
                    {
                        name: "Grisha",
                        surName: "Dobrykh",
                        login: "dobro"
                    },
                    {
                        name: "Vuetify",
                        surName: "Framework",
                        login: "vuety"
                    }
                ]
            }
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
