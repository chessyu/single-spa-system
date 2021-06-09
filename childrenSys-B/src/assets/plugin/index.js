export default {
    install(Vue) {
        Vue.prototype.$plugins = {

            isComplexDataType : obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null),
            //深拷贝
            deepCopy(obj,hash = new WeakMap()){
                if(hash.has(obj)) return hash.get(obj)
                let type = [Date,RegExp,Set,Map,WeakMap,WeakMap]
                if(type.includes(obj.constructor)) return new obj.constructor(obj);

                //如果成环了，参数obj = obj.loop = 最初的obj,会在weakMap中找到第一次放入的obj提前返回
                //第一次放入的weakMap的cloneObj

                let allDesc = Object.getOwnPropertyDescriptors(obj);  //遍历传入参数所有键的特性
                let cloneObj =  Object.create(Object.getPrototypeOf(obj),allDesc);  //继承原型
                hash.set(obj,cloneObj)

                for(let key of Reflect.ownKeys(obj)){  //Reflect.ownKeys(obj) 可以拷贝不可枚举属性和符号类型
                    //如果值是引用类型（非函数）则递归调用deepClone
                    cloneObj[key] = (this.isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? this.deepCopy(obj[key], hash) : obj[key];
                }
                return cloneObj;
            },

            // 表单重置
            formReset(obj,refName){
                if(obj.$refs[refName]){
                    obj.$refs[refName].resetFields();
                }
            },

            //联级下拉列表
            formatDate(dateArray){
                
            }
        }
    }
}