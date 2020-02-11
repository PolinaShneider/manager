<template>
    <div>
        <ul class="list">
            <li class="list__item" v-for="(user, i) in users" :key="i">
              <span v-for="(value, name, index) in user" :key="index">
                <label>{{getLabel(name)}}:</label> {{value}}<br>
              </span>
                <i class="fas fa-pencil-alt" v-on:click="edit($event, user)"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            msg: String,
            users: Array,
            keyword: String
        },
        methods: {
            getLabel: function (key) {
                // const data = this.$dictionary[this.keyword][key];
                return key
            },
            edit: function (event, item) {
                this.$emit('edit-user', {isEdited: true, currentUser: item});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        text-align: initial;
    }

    .list {
        border-radius: 4px;
        border: 1px solid sandybrown;
        padding: 8px;
        margin: 10px;
    }

    .list__item {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        border: 1px solid sandybrown;
    }

    .list__item:not(:first-of-type) {
        border-top: 0;
    }

    .list__item span {
        margin-right: 20px;
    }

    .list__item i {
        cursor: pointer;
    }

    .list__item label {
        font-weight: bold;
    }
</style>
