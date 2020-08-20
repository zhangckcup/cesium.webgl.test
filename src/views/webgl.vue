<template>
  <div class="webgl">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/ch04/rotating-triangle';

export default {
  name: 'webgl',

  components: {
    Home
  }
};
</script>

<style lang="less" scoped>
.webgl {
  height: 100vh;
  width: 100vw;
}
</style>
