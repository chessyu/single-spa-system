
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="IP_ChatMonitorAddRef" class="formItem" :model="rowData" :rules="ruleValidate" :label-width="130">
            <FormItem label="游戏名称" title=""  class="itemWidth"  prop="gameName">
                <Input v-model="rowData.gameName" placeholder="请输入岗位名称" />
            </FormItem>
            <FormItem label="游戏描述" title="" class="itemWidth" prop="gameDesc">
                <Input v-model="rowData.gameDesc" placeholder="请输入游戏描述" />
            </FormItem>
            <FormItem label="游戏登录地址" title="游戏登录地址"  class="itemWidth" prop="gameUrl">
                <Input v-model="rowData.gameUrl" placeholder="请输入游戏登录地址" />
            </FormItem>
            <FormItem label="游戏支付回调地址" title="游戏支付回调地址"  class="itemWidth" prop="callbackUrl">
                <Input v-model="rowData.callbackUrl" placeholder="请输入游戏支付回调地址" />
            </FormItem>
            <FormItem label="设置禁言地址" title="设置禁言地址"  class="itemWidth" prop="banUrl">
                <Input v-model="rowData.banUrl" placeholder="请输入设置禁言地址" />
            </FormItem>
            <FormItem label="设置封号地址"  title="设置封号地址" class="itemWidth" prop="sealUrl">
                <Input v-model="rowData.sealUrl" placeholder="请输入设置设置封号地址" />
            </FormItem>
            <FormItem label="游戏MD5"  title="游戏的MD5签名密码(我们生成,分配给游戏)" class="itemWidth " prop="gameSecret">
                <Input v-model="rowData.gameSecret" placeholder="请输入游戏的MD5签名密码(我们生成,分配给游戏)" />
            </FormItem>
            <FormItem label="聊天频道" title="" class="itemWidth" prop="chatType">
                <Input v-model="rowData.chatType" placeholder="请输入聊天频道" />
            </FormItem>
            <FormItem label="对接描述"  class="itemRemark" prop="joinDepict">
                <Input type="textarea" v-model="rowData.joinDepict" placeholder="请输入对接描述" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { IP_ChatMonitorAdd,IP_ChatMonitorEdit} from '@/api/dataSystem/chatMonitor.js'

export default{
    data(){
        return{
            ruleValidate:{
                gameId:[
                    { required: true, type: 'number', message: '请选择游戏', trigger: 'change' }
                ],
                tsKey:[
                    { required: true, message: '第三方Key不能为空', trigger: 'blur' }
                ],
                zoneKey:[
                    { required: true,message: '专区标识不能为空', trigger: 'blur' },
                    { type: 'string', max:16,message: '最大长度为16个字符', trigger: 'blur' }
                ],
                staticParams:[
                    { required: true, message: '静态参数不能为空', trigger: 'blur' }
                ]
            }
        }
    },
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
        ok(){
            this.$refs["IP_ChatMonitorAddRef"].validate((valid) => {
                if (valid) {
                    this.postData()
                }else{
                    this.$Message.error("必填项未填写内容");
                    setTimeout(() => {
                        this.$emit('modalClose',true);
                    }, 500);
                }
            })
        },
        async postData(){
            let data = this.actionType == 'edit' ? await IP_ChatMonitorEdit(this.rowData) : await IP_ChatMonitorAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_ChatMonitorAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_ChatMonitorAddRef")
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
    