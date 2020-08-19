
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false" 
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="IP_TestEnvAddRef" :model="rowData" :rules="ruleValidate" :label-width="130">
            <FormItem label="游戏ID" title="游戏ID"  class="form_item" prop="gameId">
                <Select v-model="rowData.gameId"  placeholder="请选择游戏" clearable>
                    <Option v-for="(item,index) in gameList" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="专区标识" title="" class="form_item" prop="zoneKey">
                <Input v-model="rowData.zoneKey" placeholder="请输入专区标识" />
            </FormItem>
            <FormItem label="渠道key" title=""  class="form_item"  prop="snKey">
                <Input v-model="rowData.snKey" placeholder="请输入渠道key" />
            </FormItem>
            <FormItem label="游戏地址" title="游戏地址"  class="form_item" prop="gameUrl">
                <Input v-model="rowData.gameUrl" placeholder="请输入游戏地址" />
            </FormItem>
            <FormItem label="支付回调" title="平台的测试服支付回调域名"  class="form_item" prop="callbackUrl">
                <Input v-model="rowData.callbackUrl" placeholder="请输入平台的测试服支付回调域名" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { IP_TestEnvAdd,IP_TestEnvEdit} from '@/api/issueSystem/testEnv.js'

export default{
    data(){
        return{
            ruleValidate:{
                gameId:[
                    { required: true, type: 'number', message: '请选择游戏', trigger: 'change' }
                ],
                zoneKey:[
                    { required: true,message: '专区标识不能为空', trigger: 'blur' },
                    { type: 'string', max:16,message: '最大长度为16个字符', trigger: 'blur' }
                ],
                snKey:[
                    { required: true, message: '渠道key不能为空', trigger: 'blur' }
                ],
                gameUrl:[
                    { required: true, message: '游戏地址不能为空', trigger: 'blur' }
                ],
                callbackUrl:[
                    { required: true, message: '支付回调地址不能为空', trigger: 'blur' }
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
        gameList:{
            type:Array,
            required:true
        }
    },
    methods:{
        ok(){
            this.$refs["IP_TestEnvAddRef"].validate((valid) => {
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
            let data = this.actionType == 'edit' ? await IP_TestEnvEdit(this.rowData) : await IP_TestEnvAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_TestEnvAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_TestEnvAddRef")
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
            return this.actionType == 'add' ? '新增测试环境' : '修改测试环境';   //改
        }
    }

}
</script>

<style lang="less" scoped>

</style>
    