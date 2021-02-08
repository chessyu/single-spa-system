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

            //报表计算高度
            computedHeight(newVal,id,obj){
                try{
                    let perNodeH = document.getElementById(id).previousElementSibling.offsetHeight;     //查询条件块的高度
                    let parentNodeH = document.getElementById(id).parentNode.offsetHeight;                  //视图容器的高度
                    let {height} = newVal;
                    if(obj){
                      obj.tableHeight = height - 265 - perNodeH ;
                    }else{
                        return   parentNodeH - perNodeH - 148;
                    }
                  }catch(err){}
            },

            
            /**
             * 处理日期返回字符串  （单个日期，日期段）
             * @param  {Array} field  需要转换的字段名
             * @param {Object} menuQuery field父级
             */
            formatDateToString(field,menuQuery){
                let obj = {};
                field.forEach( e => {
                    if(menuQuery[e][0] instanceof Date){
                        let date = menuQuery[e].map((h,i) => {
                            return `${h.getFullYear()}-${(h.getMonth()+1)<10?('0'+ (h.getMonth()+1)): (h.getMonth()+1)}-${h.getDate() < 10 ? '0'+h.getDate() : h.getDate() }`
                        })
                        obj[e] = date.join(',');
                    }else if(menuQuery[e] instanceof Date){
                        let h = menuQuery[e];
                        obj[e] = `${h.getFullYear()}-${(h.getMonth()+1)<10?('0'+ (h.getMonth()+1)): (h.getMonth()+1)}-${h.getDate() < 10 ? '0'+h.getDate() : h.getDate() }`;
                    }else {
                        obj[e] = '';
                    }
                })
                let newMenuQuery = JSON.parse(JSON.stringify(menuQuery));
                return Object.assign(newMenuQuery,obj) ;
            },
            /**
             * 处理日期时间返回字符串  （单个日期时间，日期时间段）
             * @param  {Array} field  需要转换的字段名
             * @param {Object} menuQuery field父级
             */
            formatDateTimeToString(field,menuQuery){
                let obj = {};
                field.forEach( e => {
                    if(menuQuery[e][0] instanceof Date){
                        let date = menuQuery[e].map((h,i) => {
                            return `${h.getFullYear()}-${(h.getMonth()+1)<10?('0'+ (h.getMonth()+1)): (h.getMonth()+1)}-${h.getDate() < 10 ? '0'+h.getDate() : h.getDate() } ${h.getHours()<10? '0'+h.getHours() : h.getHours()}:${h.getMinutes()<10?'0'+h.getMinutes(): h.getMinutes()}:${h.getSeconds()<10?'0'+h.getSeconds():h.getSeconds()}`
                        })
                        obj[e] = date.join(',');
                    }else if(menuQuery[e] instanceof Date){
                        let h = menuQuery[e];
                        obj[e] = `${h.getFullYear()}-${(h.getMonth()+1)<10?('0'+ (h.getMonth()+1)): (h.getMonth()+1)}-${h.getDate() < 10 ? '0'+h.getDate() : h.getDate() } ${h.getHours()<10? '0'+ h.getHours() : h.getHours()}:${h.getMinutes()<10?'0'+h.getMinutes(): h.getMinutes()}:${h.getSeconds()<10?'0'+h.getSeconds():h.getSeconds()}`;
                    }else {
                        obj[e] = '';
                    }
                })
                let newMenuQuery = JSON.parse(JSON.stringify(menuQuery));
                return Object.assign(newMenuQuery,obj) ;
            }
        }
    }
}