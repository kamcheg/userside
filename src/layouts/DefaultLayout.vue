<template>
  <div class="default-layout">
    <slot />

    <div v-show="$store.getters['loading/load']" class="loading">
      <h1>Loading ...</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="scss">
.default-layout {
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.85);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
  }
}

body {
  font-family: 'Nunito', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
