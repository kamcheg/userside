import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import api from './plugins/api'

createApp(App)
  .use(store)
  .use(router)
  .use(api, { axios })
  .use(ElementPlus)
  .mount('#app')
