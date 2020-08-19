<template>
  <div class="cesium">
    <div id="cesium-test"></div>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';

export default {
  name: 'Home',

  mounted() {
    new Cesium.Viewer('cesium-test', {
      animation: false,
      timeline: false,
      terrainProvider: Cesium.createWorldTerrain(),
      creditContainer: document.createElement('div')
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
