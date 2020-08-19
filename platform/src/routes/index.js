import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'



Vue.use(VueRouter)



const router =  new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})
// router.onError((error) => {
    // console.log(error,6666666666666666666666)
    // const pattern = /Loading chunk (\d)+ failed/g;
    // const isChunkLoadFailed = error.message.match(pattern);
    // const targetPath = router.history.pending.fullPath;
    // if (isChunkLoadFailed) {
    //   router.replace(targetPath);
    // }
// });

VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalReplace = VueRouter.prototype.replace;

export default router;