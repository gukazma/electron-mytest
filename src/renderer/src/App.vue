<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VcViewer } from 'vue-cesium'
import type { VcReadyObject } from 'vue-cesium/es/utils/types'

  const viewerRef = ref<HTMLElement>(null)

  onMounted(() => {
    viewerRef.value.creatingPromise.then((readyObj: VcReadyObject) => {
      console.log(readyObj.Cesium) // Cesium namespace object
      console.log(readyObj.viewer) // instanceof Cesium.Viewer
    })
  })

  const onViewerReady = (readyObj: VcReadyObject) => {
    console.log(readyObj.Cesium) // Cesium namespace object
    console.log(readyObj.viewer) // instanceof Cesium.Viewer
    // var tileset = readyObj.Cesium.Cesium3DTileset.fromUrl("D:/codes/electron-dev/cesium-viewer/src/renderer/public/Cesium-1.115/Apps/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json");
    // readyObj.viewer.scene.primitives.add(tileset);
    // readyObj.viewer.zoomTo(tileset, new readyObj.Cesium.HeadingPitchRange(0.0, -1.0, 5))
  }
</script>

<template>
  <vc-viewer ref="viewerRef" @ready="onViewerReady"> </vc-viewer>
</template>
