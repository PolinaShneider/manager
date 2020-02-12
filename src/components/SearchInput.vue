<template>
    <div>
        <label for="search">Search me...</label>
        <div>{{result.length ? '' : 'Nothing found'}}</div>
        <input id="search" type="text" placeholder="Search me" v-bind:value="searchValue"
               v-on:input="searchValue = $event.target.value">
    </div>
</template>

<script>
    export default {
        name: 'SearchInput',
        props: {
            data: Array
        },
        data: () => {
            return {
                searchValue: ''
            }
        },
        methods: {
            search: function (aza) {
                console.log(aza)
            }
        },
        computed: {
            result: function () {
                const data = [...this.data];
                const result = [];
                data.forEach(elem => {
                    const {login, name, surName} = elem;
                    if (login.includes(this.searchValue) || name.includes(this.searchValue) || surName.includes(this.searchValue)) {
                        result.push(elem)
                    }
                });

                this.$emit('search-result', result);
                return result;
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 500px;
        min-height: 200px;
        background: aliceblue;
        padding: 16px 8px;
        border-radius: 4px;
        border: 1px solid darkblue;
    }
</style>
