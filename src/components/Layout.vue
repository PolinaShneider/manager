<template>
  <div class="container">
    <slot name="top"></slot>
    <Delimiter></Delimiter>
    <slot name="middle"></slot>
  </div>
</template>

<script>
    import Delimiter from "./Delimiter";

    export default {
        name: 'Layout',
        components: {
            Delimiter
        }
    }
</script>

