import Vue from 'vue'
import App from './app.vue'
import router from './routes/index.js'
import ViewUI from 'view-design'
import store from '@/store/index.js'
import singleSpaVue from 'single-spa-vue';
import singleSpaConfig from './single-spa-config'
import { setPublicPath } from 'systemjs-webpack-interop'
import Cookies from 'js-cookie'
import systemConfig from '../systemConfig.json'
import buttomPower from 'public-component-ui/utils/directive'


import '@/assets/less/index.less'
// import 'view-design/dist/styles/iview.css';
import '@/assets/less/setTheme.js'
Vue.use(ViewUI);



Vue.config.productionTip = false

const vueOptions = {
    el:'#showView',
    render:h=>h(App),
    router,
    store
}
console.log("IP",process.env.NODE_ENV )
if(process.env.NODE_ENV == 'development'){
    Vue.use(buttomPower)
    vueOptions.el = "#app";
    new Vue(vueOptions);
}


setPublicPath(systemConfig.systemCode, 2)
const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: vueOptions,
});


export const bootstrap = vueLifecycles.bootstrap;

export const mount = props => vueLifecycles.mount(props).then(instance => {
    window.$spaConfig ? window.$spaConfig.push(singleSpaConfig) : window.$spaConfig = [singleSpaConfig];

    Cookies.set('Admin-Token',props.customProps.token)

    window.parent.postMessage({
        isSonSys:true,
        systemCode:systemConfig.systemCode,
        systemName:systemConfig.systemName,
        msg:systemConfig.systemName+"加载完成 ✔"
    },"*");

});

export const unmount = props => vueLifecycles.unmount(props).then(()=>{
    console.log(systemConfig.systemName+"：卸载",props)
})

