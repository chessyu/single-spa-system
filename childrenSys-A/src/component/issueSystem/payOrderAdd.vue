
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="IP_PayOrderAddRef" :model="rowData" :label-width="130">
            <FormItem label="游戏名称" title=""  class="form_item"  prop="gameName">
                <Input v-model="rowData.gameName" placeholder="请输入岗位名称" />
            </FormItem>
            <FormItem label="游戏描述" title="" class="form_item" prop="gameDesc">
                <Input v-model="rowData.gameDesc" placeholder="请输入游戏描述" />
            </FormItem>
            <FormItem label="游戏登录地址" title="游戏登录地址"  class="form_item" prop="gameUrl">
                <Input v-model="rowData.gameUrl" placeholder="请输入游戏登录地址" />
            </FormItem>
            <FormItem label="游戏支付回调地址" title="游戏支付回调地址"  class="form_item" prop="callbackUrl">
                <Input v-model="rowData.callbackUrl" placeholder="请输入游戏支付回调地址" />
            </FormItem>
            <FormItem label="设置禁言地址" title="设置禁言地址"  class="form_item" prop="banUrl">
                <Input v-model="rowData.banUrl" placeholder="请输入设置禁言地址" />
            </FormItem>
            <FormItem label="设置封号地址"  title="设置封号地址" class="form_item" prop="sealUrl">
                <Input v-model="rowData.sealUrl" placeholder="请输入设置设置封号地址" />
            </FormItem>
            <FormItem label="游戏MD5"  title="游戏的MD5签名密码(我们生成,分配给游戏)" class="form_item " prop="gameSecret">
                <Input v-model="rowData.gameSecret" placeholder="请输入游戏的MD5签名密码(我们生成,分配给游戏)" />
            </FormItem>
            <FormItem label="聊天频道" title="" class="form_item" prop="chatType">
                <Input v-model="rowData.chatType" placeholder="请输入聊天频道" />
            </FormItem>
                <FormItem label="扩展字段" title="" class="form_item" prop="gameExt">
                <Input v-model="rowData.gameExt" placeholder="扩展字段" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { IP_PayOrderAdd,IP_PayOrderEdit} from '@/api/issueSystem/payOrder.js'

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
            let data = this.actionType == 'edit' ? await IP_PayOrderEdit(this.rowData) : await IP_PayOrderAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_PayOrderAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_PayOrderAddRef")
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
            return this.actionType == 'add' ? '新增游戏信息' : '修改游戏信息';   //改
        }
    }

}
</script>

<style lang="less" scoped>

</style>
    