import { createApp } from 'vue'
import VueCesium from 'vue-cesium'
import App from './App.vue'

import 'vue-cesium/dist/index.css'

createApp(App).use(VueCesium, {
    cesiumPath: './Cesium-1.115/Build/Cesium/Cesium.js'
  }).mount('#app')