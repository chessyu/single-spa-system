<template>
    <Modal
        v-model="show"
        :title="title"
        width="850px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="postAddRef" :model="rowData" :label-width="80">
            <FormItem label="岗位名称" prop="postName">
                <Input v-model="rowData.postName" placeholder="请输入岗位名称" />
            </FormItem>
            <FormItem label="岗位职称" prop="postCode" >
                <Input v-model="rowData.postCode" placeholder="请输入岗位编码" />
            </FormItem>
            <FormItem label="岗位顺序" prop="postSort" >
                <Input type="number" min="1" v-model="rowData.postSort" placeholder="请输入岗位顺序" />
            </FormItem>
            <FormItem label="状态" >
               <RadioGroup v-model="rowData.status">
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
import { PA_postEdit, PA_postAdd } from '@/api/system/post.js'

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
            default:{}
        }
    },
    methods:{
        async ok(){
            let data = this.actionType == 'edit' ? await PA_postEdit(this.rowData) : await PA_postAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"postAddRef");
                this.$emit('dictColse',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('dictColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"postAddRef")
        }
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
            if(this.actionType == "add"){
                return "添加岗位"
            }else{
                return "修改岗位"
            }
        }
    }

}
</script>

<style lang="less" scoped>

</style>