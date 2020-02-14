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
    <div v-if="errors.length" class="alert alert-danger">{{errors[0]}}</div>
    <button type="button" class="btn btn-outline-primary" v-on:click="updateUser">Submit</button>
  </form>
</template>

<script>
    export default {
        name: 'Dialog',
        props: {
            msg: String,
            user: Object,
            isNew: Boolean,
            logins: Array
        },
        data: function () {
            return {
                editedUser: {...this.user},
                errors: []
            }
        },
        methods: {
            getLabel: function (key) {
                return this.$dictionary['users'][key]
            },
            checkForm: function () {
                if (!this.editedUser.name) {
                    this.errors.push('User name cannot be empty');
                }

                if (!this.editedUser.surName) {
                    this.errors.push('User surname cannot be empty');
                }

                const login = this.editedUser.login.length;
                if (login < 4 || login > 5) {
                    this.errors.push('User login must be between 4 and 5 symbols');
                }

                if (this.isNew && this.logins.find(elem => elem === this.editedUser.login.trim())) {
                    this.errors.push(`User login '${this.editedUser.login}' already exists`);
                }
            },
            updateUser: function () {
                this.errors = [];
                this.checkForm();
                if (this.errors.length) {
                    return;
                }
                this.$emit('update-user', {user: {...this.editedUser}})
            },
            updateValue: function (event, name) {
                this.editedUser[name] = event.target.value;
            },
            getEditableFields: function (user) {
                let fields = {};

                if (!user) {
                    return fields;
                }

                fields = {...fields, name: user.name, surName: user.surName};

                if (this.isNew) {
                    return {...fields, login: user.login}
                }

                return fields;
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
