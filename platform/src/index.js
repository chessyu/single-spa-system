
import Vue from 'vue'
import App from './app.vue'
import router from './routes/index.js'
import store from '@/store/index.js'
import publicComponentUi from 'public-component-ui'
import ViewUI from 'view-design'
import ECharts from 'vue-echarts'
import Plugin from '@/assets/Plugin/index.js'
import buttomPower from '@/directive'

import 'public-component-ui/lib/public-component-ui.css'
import '@/assets/less/index.less'
import './assets/font/iconfont.css'
// import 'view-design/dist/styles/iview.css';
import '@/assets/less/setTheme'
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


