<template>
    <Modal
        v-model="show"
        :title="title"
        width="850px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="menuAddRef" :model="rowData"  :rules="ruleValidate"  :label-width="80">
            <FormItem label="上级菜单" prop="parentId">
                <treeselect
                v-model="rowData.parentId"
                :options="menuOption"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
            />
            </FormItem>
            <FormItem label="类型" prop="menuType" >
                <RadioGroup v-model="rowData.menuType">
                    <Radio label="M"><span>目录</span></Radio>
                    <Radio label="C"><span>菜单</span></Radio>
                    <Radio label="F"><span>按钮</span></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="图标" prop="icon" v-show="rowData.menuType == 'M'">
                <pc-select-icon  :modelData="rowData.icon" placeholder="请选择图标"></pc-select-icon>
            </FormItem>
            <FormItem :label="menuName" prop="menuName">
                <Input v-model="rowData.menuName" placeholder="请输入名称" />
            </FormItem>
            <FormItem label="显示排序" prop="orderNum">
                <Input type="number" v-model="rowData.orderNum" placeholder="请配置排序" />
            </FormItem>
            <FormItem label="路由名称" prop="path"  v-show="rowData.menuType != 'F'">
                <Input v-model="rowData.path" :disabled="isMenu" placeholder="请输入路由名称" />
            </FormItem>
            <FormItem label="路由地址" prop="component"  v-show="rowData.menuType == 'C'">
                <Input v-model="rowData.component" placeholder="请输入路由地址" />
            </FormItem>
            <FormItem label="权限标识" prop="perms"  v-show="rowData.menuType != 'M'">
                <Input v-model="rowData.perms" placeholder="请输入权限标识" />
            </FormItem>
            <FormItem label="状态" >
                <RadioGroup v-model="rowData.visible">
                    <Radio label="1"><span>正常</span></Radio>
                    <Radio label="0"><span>禁用</span></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input type="textarea" :rows="4" v-model="rowData.remark" placeholder="请输入备注信息" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { PA_postMenuEdit, PA_postMenuAdd, PA_getMenuList } from '@/api/system/menu.js'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default{
    props:{
        showAdd:{
            type:Boolean,
            required:true
        },
        actionType:{
            type:String,
            required:true
        },
        rowData:{
            type:Object,
            required:true,
        },
        menuList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            menuName:'目录名称',
            ruleValidate:{
                parentId:[
                    { required: true, message: '上级菜单为必填项', trigger: 'blur' }
                ],
                menuName:[
                    { required: true, message: `当前项为必填项`, trigger: 'blur' }
                ],
                perms: [
                    { required: true, message: '权限标识不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
        // this.getDeptList();
    },
    methods:{
        ok(){
            this.$refs["menuAddRef"].validate((valid) => {
                if (valid) {
                    this.postData()
                }else{
                    this.$Message.error("必填项未填写内容");
                    setTimeout(() => {
                        this.$emit('dictColse',true);
                    }, 500);
                }
            })
        },
        async postData(){
            let data = this.actionType == 'edit' ? await PA_postMenuEdit(this.rowData) : await PA_postMenuAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"menuAddRef");
                this.$emit('dictColse',false);
                this.$emit("reload",this.actionType,data.data)
                
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('dictColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"menuAddRef")
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
                }
                return {
                id: node.menuId,
                label: node.menuName,
                children: node.children
            };
        },
        onChange(value){
            this.rowData.icon = value;
        }
    },
    computed:{
        menuOption(){
            return [
                {
                    menuId:0,
                    menuName:"顶级菜单",
                    children: this.menuList
                }
            ] ;
        },
        show:{
            get(){
                return this.showAdd;
            },
            set(){
                this.$emit('dictColse',false)
            }
        },
        isMenu(){
            return this.rowData.parentId == 0;
        },
        title(){
            if(this.actionType == "add"){
                return "添加菜单"
            }else{
                return "修改菜单"
            }
        }
    },
    watch:{
        'rowData.menuType':{
            handler(newValue,oldValue){
                if(newValue == 'M') this.menuName = '目录名称'
                if(newValue == 'C') this.menuName = '菜单名称'
                if(newValue == 'F') this.menuName = '按钮名称'
            }
        }
    },
    components:{
        Treeselect
    }

}
</script>

<style lang="less" scoped>

</style>