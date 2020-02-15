<template>
  <div>
    <label for="search">Users database search...</label>
    <div>{{result.length ? '' : ''}}</div>
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
                const result = [];
                data.forEach(elem => {
                    const {login, name, surName} = elem;
                    const prepared = [
                        login, name, surName
                    ].map(elem => elem.trim().toLowerCase());
                    if (prepared.some(elem => elem.includes(this.searchValue))) {
                        result.push(elem)
                    }
                });

                this.$emit('search-result', result);
                return result;
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
