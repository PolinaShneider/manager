<template>
    <div class="modal-overlay" v-show="visible">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'DialogContainer',
        props: {
            visible: Boolean
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .15);
    }
</style>
