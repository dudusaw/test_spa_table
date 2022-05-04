import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
