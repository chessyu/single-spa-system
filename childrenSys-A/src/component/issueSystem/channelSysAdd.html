
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="IP_ChannelSysAddRef" :model="rowData" :label-width="130">
            <FormItem label="主渠道"  class="form_item"  prop="parentKey">
                <Input v-model="rowData.parentKey" placeholder="请输入主渠道" />
            </FormItem>
            <FormItem label="渠道key"  class="form_item" prop="snKey">
                <Input v-model="rowData.snKey" placeholder="请输入渠道key" />
            </FormItem>
            <FormItem label="渠道名称"  class="form_item" prop="snName">
                <Input v-model="rowData.snName" placeholder="请输入渠道名称" />
            </FormItem>
            <FormItem label="渠道描述"  class="form_item" prop="snDesc">
                <Input v-model="rowData.snDesc" placeholder="请输入渠道描述" />
            </FormItem>
            <FormItem label="扩展字段"  class="form_item" prop="snExt">
                <Input v-model="rowData.snExt" placeholder="请输入扩展字段" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { IP_ChannelSysAdd,IP_ChannelSysEdit} from '@/api/issueSystem/channelSys.js'

export default{
    props:{
        showModal:{
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
    },
    methods:{
        async ok(){
            let data = this.actionType == 'edit' ? await IP_ChannelSysEdit(this.rowData) : await IP_ChannelSysAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_ChannelSysAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_ChannelSysAddRef")
        }
    },
    computed:{
        show:{
            get(){
                return this.showModal;
            },
            set(){
                this.$emit('modalClose',false)
            }
        },
        title(){
            return this.actionType == 'add' ? '新增渠道关联' : '修改渠道关联';   //改
        }
    }

}
</script>

<style lang="less" scoped>

</style>
    