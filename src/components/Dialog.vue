<template>
  <form class="dialog">
    <div>
      <div v-for="(value, name, index) in getEditableFields(editedUser)" :key="index" class="form-group">
        <label for="`${name}`">{{getLabel(name)}}:</label>
        <input
            type="text" id="`${name}`" class="form-control"
            v-bind:value="value" v-on:input="updateValue($event, name)"
        >
      </div>
    </div>
    <button type="button" class="btn btn-outline-primary" v-on:click="updateUser">Submit</button>
  </form>
</template>

<script>
    export default {
        name: 'Dialog',
        props: {
            msg: String,
            user: Object
        },
        data: function () {
            return {
                editedUser: {...this.user}
            }
        },
        methods: {
            getLabel: function (key) {
                return this.$dictionary['users'][key]
            },
            updateUser: function () {
                this.$emit('update-user', {user: {...this.editedUser}})
            },
            updateValue: function (event, name) {
                this.editedUser[name] = event.target.value;
            },
            getEditableFields: function (user) {
                return user && {
                    name: user.name,
                    surName: user.surName
                }
            }
        },
        watch: {
            user: function (newVal, oldVal) { // watch it
                if (newVal && newVal !== oldVal) {
                    this.editedUser = {...newVal};
                }
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
    background: #F6F6F6;
    padding: 30px 16px 16px 16px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  input:focus, input:active {
    box-shadow: none;
    border-color: rgba(0, 0, 0, 0.25);
  }
</style>
