<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IpcRenderer } from 'electron';
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
    window.electron.ipcRenderer.send('ping')
    
    window.electron.ipcRenderer.send('asynchronous-message', 'sdasdasd')
    window.electron.ipcRenderer.on('asynchronous-reply', (_event, arg) => {
      console.log(arg) // 在 DevTools 控制台中打印“pong”
      console.log("123123!!!")
    })
    // var tileset = readyObj.Cesium.Cesium3DTileset.fromUrl("D:/codes/electron-dev/cesium-viewer/src/renderer/public/Cesium-1.115/Apps/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json");
    // readyObj.viewer.scene.primitives.add(tileset);
    // readyObj.viewer.zoomTo(tileset, new readyObj.Cesium.HeadingPitchRange(0.0, -1.0, 5))
  }
</script>

<template>
  <vc-viewer ref="viewerRef" @ready="onViewerReady"> </vc-viewer>
</template>
