import Vue from 'vue'
import VueResource from 'vue-resource'
import { Button,Skeleton,Image as VanImage,Cell,Grid, GridItem,Swipe, SwipeItem,Popup,Toast } from 'vant';
import App from './App.vue'

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

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
