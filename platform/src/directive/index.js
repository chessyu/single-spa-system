import buttomPower from './buttomPower'

const install = function(Vue) {
    Vue.directive('buttomPower', buttomPower)
  }
  
  if (window.Vue) {
    window['buttomPower'] = buttomPower
    Vue.use(install); 
  }
  
  export default install
  