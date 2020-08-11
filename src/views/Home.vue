<template>
  <div class="home">
    <div id="cesium-test"></div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';
window.CESIUM_BASE_URL = './';

export default {
  name: 'Home',

  mounted() {
    new Cesium.Viewer('cesium-test', {
      animation: false,
      timeline: false,
      terrainProvider: Cesium.createWorldTerrain()
    });
  }
};
</script>

<style lang="less" scoped>
#cesium-test {
  height: 100vh;
  width: 100vw;
}
</style>
