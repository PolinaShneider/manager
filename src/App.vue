<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <Layout>
            <List slot="content" :users="users" :keyword="'users'"></List>
        </Layout>
    </div>
</template>

<script>
    import Layout from "./components/Layout";
    import List from "./components/List";

    export default {
        name: 'App',
        components: {
            Layout,
            List
        },
        data: () => {
            return {
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
        },
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
