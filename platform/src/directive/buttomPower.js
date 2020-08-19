/**
 * 操作权限处理
 */

import store from '@/store'

export default{
    inserted(el, binding, vnode){
        const { value } = binding;
        const all_buttomPower = "*:*:*";
        let buttomPower = store.getters && store.getters.getUserButtomPower;
        if(value && value instanceof Array && value.length > 0){
            let hasPowe = buttomPower.includes(all_buttomPower) || buttomPower.includes(value[0]);
            if(!hasPowe){
                let elParent = el.parentNode;
                el.parentNode && el.parentNode.removeChild(el)
                if(elParent.childNodes.length == 0 && elParent.classList == "ivu-dropdown-menu"){
                    elParent.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(elParent.parentNode.parentNode.parentNode.parentNode)
                }
            }
        }else {
            throw new Error(`请联系管理员配置操作权限！！！`)
        }
    }
}