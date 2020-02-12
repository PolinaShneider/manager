<template>
    <div class="list-wrapper">
        <div v-if="!loading" class="list-wrapper-content">
<!--            <div>{{users.length ? '' : 'Nothing found'}}</div>-->
            <ul class="list">
                <li class="list__item" v-for="(user, i) in users" :key="i">
              <div v-for="(value, name, index) in user" :key="index">
                <div><b>{{getLabel(name)}}</b></div>
                  <div>{{value}}</div>
              </div>
                    <i class="fas fa-pencil-alt" v-on:click="edit($event, user)"></i>
                </li>
            </ul>
        </div>
        <div v-else>
            <span id="loading"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            msg: String,
            users: Array,
            keyword: String,
            loading: Boolean
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
        flex-grow: 1;
    }

    .list-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .list-wrapper-content {
        width: 100%;
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
        width: calc(33% - 20px);
    }

    .list__item i {
        cursor: pointer;
    }

    .list__item label {
        font-weight: bold;
    }

    #loading {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid sandybrown;
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
</style>
