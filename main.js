import App from './App'
import Vue from 'vue'

import gUi from "@gui"
Vue.use(gUi)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()