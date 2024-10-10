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
    
    // window.electron.ipcRenderer.send('asynchronous-message', 'sdasdasd')
    window.electron.ipcRenderer.on('asynchronous-reply', (_event, arg) => {
      console.log(arg) // 在 DevTools 控制台中打印“pong”
      console.log("123123!!!")
      // 替换多余的斜杠为单个斜杠
      let fixedPath = arg.replace(/(\/)+/g, '/');

      // 检查路径分隔符，如果是正斜杠则替换为反斜杠
      fixedPath = fixedPath.replace(/\//g, '\\');

      // 构建最终的路径
      let finalPath = 'file:///' + fixedPath;
      console.log(finalPath) // 在 DevTools 控制台中打印“pong”
      readyObj.Cesium.Cesium3DTileset.fromUrl(finalPath).then(result => {
      console.log(result)
      readyObj.viewer.scene.primitives.add(result)
      readyObj.viewer.zoomTo(result, new readyObj.Cesium.HeadingPitchRange(0.0, -1.0, 50))
    }).catch(err => {
      console.log(err)
    })
      
    })
  }
  const onButtonClick = () => {
    window.electron.ipcRenderer.send('asynchronous-message', 'sdasdasd')
  }
</script>

<template>
  <vc-viewer ref="viewerRef" @ready="onViewerReady"> </vc-viewer>
  <button type="button" @click="onButtonClick()">
    Open
  </button>
</template>
