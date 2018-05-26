// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import "./css/reset.css"
import "./css/font/iconfont.css"
import "./css/style.css"
import VueResurce from 'vue-resource'

Vue.use(VueResurce)
Vue.use(Mint)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
