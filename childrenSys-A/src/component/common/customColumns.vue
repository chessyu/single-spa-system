<template>
    <Dropdown class="buttom_handler"  placement="bottom-end">
            <a href="javascript:void(0)">
            自定义列
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <CheckboxGroup class="bh_group" v-model="newDropDown"  transfer>
                <Checkbox class="bh_checkbox" :label="item.value" v-for="(item,index) in columnsList" :key="index">
                    <span>{{item.label}}</span>
                </Checkbox>
            </CheckboxGroup>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
    export default{
        props:{
            dropdown:{
                type:Array,
                required:true
            },
            titleConfig:{
                type:Array,
                required:true
            },
            fieldName:{
                type:String,
                required:true
            }
        },
        methods:{

        },
        computed:{
            columnsList(){   //当前表格的所有列
                let array = [];
                this.titleConfig.forEach(e => {
                    if(e.key){
                        array.push({
                            label:e.title,
                            value:e.key
                        })
                    }
                })

                let hasItem = JSON.parse(localStorage.getItem("setTableColumns"));
                let local = localStorage.getItem("setTableColumns") || "{}";
                if(hasItem === undefined || hasItem === null){
                    this.newDropDown = array.map(e => (e.value));
                    let obj = {};
                    obj[this.fieldName] = array.map(e => (e.value));
                    localStorage.setItem("setTableColumns",JSON.stringify(Object.assign(JSON.parse(local),obj)));
                }else{
                    if(hasItem.hasOwnProperty(this.fieldName)){
                        this.newDropDown = hasItem[this.fieldName];
                    }else{
                        let obj = {};
                        obj[this.fieldName] = array.map(e => (e.value))
                        localStorage.setItem("setTableColumns",JSON.stringify(Object.assign(JSON.parse(local),obj)));
                        this.newDropDown = array.map(e => (e.value));
                    }
                }



                // try{
                //     let hasItem = JSON.parse(localStorage.getItem("setTableColumns"))[this.fieldName];
                //     let local = localStorage.getItem("setTableColumns") || "{}";
                //     if(hasItem === undefined || hasItem === null || hasItem.length === 0){
                //         let obj = {};
                //         obj[this.fieldName] = array.map(e => (e.value))
                //         localStorage.setItem("setTableColumns",JSON.stringify(Object.assign(JSON.parse(local),obj)));
                //         this.newDropDown = array.map(e => (e.value));
                //     }else{
                //         this.newDropDown = hasItem;
                //     }
                // }catch(error){
                //     this.newDropDown = array.map(e => (e.value));
                //     let local = localStorage.getItem("setTableColumns") || "{}";
                //     let obj = {};
                //     obj[this.fieldName] = array.map(e => (e.value))
                //     localStorage.setItem("setTableColumns",JSON.stringify(Object.assign(JSON.parse(local),obj)));
                // }
                return array;
            },
            newDropDown:{
                get(){
                    return this.dropdown;
                },
                set(value){
                    this.$emit("changeDropdown",value)
                }
            }
        },
        watch:{
            newDropDown:{
                handler(value){
                    let obj = {};
                    obj[this.fieldName] = value;
                    let local = localStorage.getItem("setTableColumns") || "{}";
                    localStorage.setItem("setTableColumns",JSON.stringify(Object.assign(JSON.parse(local),obj)));
                    this.$emit("changeDropdown",value)
                },
                deep:true
            }
        }
    }
</script>


<style lang="less" scoped>

</style>