<template>
  <div>
    <label for="search">Search users by name, surname or login 🥑</label><br>
    <input id="search" type="text" placeholder="Search me" v-bind:value="searchValue"
           v-on:input="searchValue = $event.target.value" autocomplete="off">
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
        computed: {
            result: function () {
                const data = [...this.data];
                const accum = [];
                data.forEach(elem => {
                    const {login, name, surName} = elem;
                    const prepared = [
                        login, name, surName
                    ].map(elem => elem.trim().toLowerCase());
                    const searchValue = this.searchValue.toLowerCase();

                    if (prepared.some(elem => elem.includes(searchValue))) {
                        accum.push(elem)
                    }
                });

                return accum;
            }
        },
        watch: {
            result: function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    this.$emit('search-result', this.result);
                }
            }
        }

    }
</script>

<style scoped>
  input {
    outline: none;
    text-indent: 8px;
  }
</style>
