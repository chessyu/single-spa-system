import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.js'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})
