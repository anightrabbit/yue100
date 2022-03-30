import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { Button,Skeleton,Image as VanImage,Cell,Grid, GridItem,Swipe, SwipeItem,Popup,Toast,Empty } from 'vant'
import App from './App.vue'
import router from './router'


Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Skeleton)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(VueResource)
Vue.use(Empty)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
