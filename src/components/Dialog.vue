<template>
    <form class="dialog">
        <div>
            <div v-for="(value, name, index) in user" :key="index" class="form-group">
                <label for="`${name}`">{{getLabel(name)}}:</label>
                <input
                        type="text"
                        id="`${name}`"
                        class="form-control"
                        v-bind:value="value"
                        v-on:input="$emit('update-input', $event.target.value)"
                >
            </div>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="updateUser">Submit</button>
    </form>
</template>

<script>
    export default {
        name: 'Dialog',
        props: {
            msg: String,
            user: Object
        },

        methods: {
            getLabel: function (key) {
                return this.$dictionary['users'][key] || key;
            },
            updateUser: function () {
              console.log('update user mfc')
              this.$emit('update-user', this.user)
            }
        },
        mounted() {
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
