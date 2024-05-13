import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 全局样式
import '@/assets/styles/main.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import VXETable from 'vxe-table'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
console.log(router.options.routes)
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(useTable).mount('#app')

function useTable (app: any) {
  app.use(VXETable)
}
