<template>
    <Modal
        v-model="show"
        :title="title"
        width="450px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="deptAddRef" :model="rowData" :rules="ruleValidate" :label-width="80">
            <FormItem label="上级部门" prop="parentId">
                <!-- <Select v-model="rowData.parentId" readonly v-if="actionType == 'add'">
                    <Option :value="item.value" v-for="(item,index) in parentDept" :key="index">{{item.label}}</Option>
                </Select> -->
                <treeselect
                    v-model="rowData.parentId"
                    :options="deptList"
                    :normalizer="normalizer"
                    :show-count="true"
                    placeholder="选择上级菜单"
                />
            </FormItem>
            <FormItem label="部门名称" prop="deptName">
                <Input v-model="rowData.deptName" placeholder="请输入部门名称" />
            </FormItem>
            <FormItem label="显示排序" prop="orderNum" >
                <Input type="number" v-model="rowData.orderNum" placeholder="请输入排序号" />
            </FormItem>
            <FormItem label="负责人" prop="leader" >
                <Input v-model="rowData.leader" placeholder="请输入负责人" />
            </FormItem>
            <FormItem label="联系电话" prop="phone" >
                <Input v-model="rowData.phone" placeholder="请输入联系电话" />
            </FormItem>
            <FormItem label="邮箱" prop="email" >
                <Input v-model="rowData.email" placeholder="请输入负责人邮箱" />
            </FormItem>
            <FormItem label="部门状态" >
                <RadioGroup v-model="rowData.status">
                    <Radio label="1"><span>正常</span></Radio>
                    <Radio label="0"><span>禁用</span></Radio>
                </RadioGroup>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { PA_postDeptEdit, PA_postDeptAdd } from '@/api/system/dept.js'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default{
    components:{
        Treeselect
    },
    data(){
        return{
            ruleValidate:{
                deptName:[
                    { required: true, message: '部门名称为必填项', trigger: 'blur' }
                ],
                leader:[
                    { required: true, message: '负责人不能为空', trigger: 'blur' }
                ],
                phone:[
                    { pattern: /^1[3456789]\d{9}$/, max:11 ,message: "手机号码格式不正确", trigger: "blur" }
                ],
                email: [
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
            }
        }
    },
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
            default:{}
        },
        rowParentId:{
            type:Number,
            default:0
        },
        parentDept:{
            type:Array,
            required:true
        },
        deptList:{
            type:Array,
            required:false
        }
    },
    methods:{
        ok(){
            this.$refs["deptAddRef"].validate((valid) => {
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
            if(this.rowData.children && this.rowData.children.length > 0) this.rowData.children = [];
            let data = this.actionType == 'edit' ? await PA_postDeptEdit(this.rowData) : await PA_postDeptAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"deptAddRef");
                this.$emit('dictColse',false);
                this.$emit("reload",this.actionType,data.data)
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('dictColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add')  this.$plugins.formReset(this,"deptAddRef");
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
                }
                return {
                id: node.deptId,
                label: node.deptName,
                children: node.children
            };
        },
    },

    computed:{
        show:{
            get(){
                return this.showAdd;
            },
            set(){
                this.$emit('dictColse',false)
            }
        },
        title(){
            if(this.actionType == 'add'){
                return "添加部门"
            }else{
                return "修改部门"
            }
        },
        
    },
   
}
</script>

<style lang="less" scoped>

</style>