<template>
    <Modal
        v-model="show"
        :title="title"
        width="550px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="dictAddDataRef" :model="rowData" :rules="ruleValidate" :label-width="80">
            <FormItem label="字典类型" prop="dictType">
                <Input v-model="rowData.dictType" readonly  />
            </FormItem>
            <FormItem  label="数据标签" prop="dictLabel">
                <Input v-model="rowData.dictLabel" placeholder="请输入数据标签" />
            </FormItem>
            <FormItem  label="数据键值" prop="dictValue" >
                <Input v-model="rowData.dictValue" placeholder="请输入数据键值" />
            </FormItem>
             <FormItem  label="显示排序" prop="dictSort" >
                <InputNumber :min="1" v-model="rowData.dictSort" placeholder="请输入显示排序" style="width:100%;" ></InputNumber>
            </FormItem>
            <FormItem label="状态"  prop="status">
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
import { PA_postDictAdd, PA_postDictEdit } from '@/api/system/dictData.js'

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
     data(){
        return{
            ruleValidate:{
                dictLabel:[
                    { required: true, message: '数据标签不能为空', trigger: 'blur' }
                ],
                dictValue:[
                    { required: true, message: '数据键值不能为空', trigger: 'blur' }
                ],
                dictSort:[
                    { required: true, type:'number', message: '显示排序不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        async ok(){
            let data = this.actionType  == 'add' ? await PA_postDictAdd(this.rowData) :  await PA_postDictEdit(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"dictAddDataRef");
                this.$emit('dictColse',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('dictColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"dictAddDataRef")
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
                return "添加字典数据"
            }else{
                return "修改字典数据"
            }
        }
    }

}
</script>

<style lang="less" scoped>

</style>