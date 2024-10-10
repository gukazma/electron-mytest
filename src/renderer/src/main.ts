import { createApp } from 'vue'
import VueCesium from 'vue-cesium'
import App from './App.vue'

import 'vue-cesium/dist/index.css'

const app = createApp(App)

app.use(VueCesium) // 将默认使用 https://unpkg.com/cesium@latest/Build/Cesium/Cesium.js

// 由于Cesium更新可能有破坏性更新，建议在生产环境中锁定 Cesium 版本
// app.use(VueCesium, {
//   cesiumPath: 'https://unpkg.com/cesium@1.104.0/Build/Cesium/Cesium.js'
// })

app.mount('#app')