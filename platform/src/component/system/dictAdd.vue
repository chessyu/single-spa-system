<template>
    <Modal
        v-model="show"
        :title="title"
        width="850px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="dictAddRef" :model="rowData" :label-width="80">
            <FormItem label="字典名称" prop="dictName">
                <Input v-model="rowData.dictName" placeholder="请输入字典名称" />
            </FormItem>
            <FormItem label="字典类型" prop="dictType" >
                <Input v-model="rowData.dictType" placeholder="请输入字典类型" />
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
import { PA_postDictAdd, PA_postDictEdit } from '@/api/system/dict.js'

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
            let data = this.actionType  == 'add' ? await PA_postDictAdd(this.rowData) :  await PA_postDictEdit(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"dictAddRef");
                this.$emit('dictColse',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('dictColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"dictAddRef")
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
                return "添加字典"
            }else{
                return "修改字典"
            }
        }
    }

}
</script>

<style lang="less" scoped>

</style>