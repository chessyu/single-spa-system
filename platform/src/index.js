
import Vue from 'vue'
import App from './app.vue'
import router from './routes/index.js'
import store from '@/store/index.js'
import publicComponentUi from 'public-component-ui'
import ViewUI from 'view-design'
import ECharts from 'vue-echarts'
import Plugin from '../../commonModules/assets/Plugin/index.js'
import buttomPower from '@/directive'

import 'public-component-ui/lib/public-component-ui.css'
import '../../commonModules/assets/less/index.less'
import './assets/font/iconfont.css'
import '../../commonModules/assets/less/setTheme'
import 'echarts/theme/macarons'

Vue.use(ViewUI);
Vue.use(Plugin);
Vue.use(publicComponentUi);
Vue.component('v-chart', ECharts);
Vue.use(buttomPower)


Vue.config.productionTip = false

let vm = new Vue({
    el:'#app',
    router,
    store,
    render:h=>h(App)
})


