import Vue from 'vue'
import App from './App.vue'
import store from './store'
import anime from 'animejs'
import VueSpritecore from 'vue-spritecore'
Vue.use(VueSpritecore)

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$anime', { value: anime });

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
