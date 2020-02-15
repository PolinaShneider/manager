<template>
  <div class="loader-container">
    <span id="loading"></span>
  </div>
</template>

<script>
    export default {
        name: 'Loader'
    }
</script>

<style scoped>
  /**
   * Loader styles
   */
  .loader-container {
    height: 325px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid #40B883;
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
