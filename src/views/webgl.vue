<template>
  <div class="webgl">
    <HelloTriangel />
  </div>
</template>

<script>
import HelloTriangel from '@/components/ch03/hello-triangle';

export default {
  name: 'webgl',

  components: {
    HelloTriangel
  }
};
</script>

<style lang="less" scoped>
.webgl {
  height: 100vh;
  width: 100vw;
}
</style>
