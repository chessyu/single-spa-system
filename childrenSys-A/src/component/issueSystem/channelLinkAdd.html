
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form class="formItem" ref="IP_ChannelLinkAddRef" :model="rowData" :rules="ruleValidate" :label-width="100">
            <FormItem label="游戏"  title="游戏" class="itemWidth"  prop="gameId">
               <Select v-model="rowData.gameId"  placeholder="请选择游戏" clearable>
                    <Option v-for="(item,index) in gameList" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
             <FormItem label="对接状态"  class="itemWidth" prop="joinState">
                <Select v-model="rowData.joinState">
                    <Option :value="0">对接中</Option>
                    <Option :value="1">待接支付</Option>
                    <Option :value="2">对接完成</Option>
                    <Option :value="3">已上线</Option>
                </Select>
            </FormItem>
            <FormItem label="专区标识" itle="专区标识" class="itemWidth" prop="zoneKey">
                <Input v-model="rowData.zoneKey" placeholder="请输入专区标识" />
            </FormItem>
            <FormItem label="渠道key" title="渠道key"  class="itemWidth " prop="snKey">
                <Input v-model="rowData.snKey" placeholder="请输入渠道key" />
            </FormItem>
            <FormItem label="tsKey" title="tsKey"  class="itemWidth " prop="tsKey">
                <Input v-model="rowData.tsKey" placeholder="请输入tsKey" />
            </FormItem>
            <FormItem label="静态参数" title="游戏在渠道的静态参数(json格式保存)"  class="itemRemark " prop="staticParams">
                <Input type="textarea" :rows="4" v-model="rowData.staticParams" placeholder="第三方的静态参数(json格式保存)" />
            </FormItem>
            <FormItem label="配置参数"  title="配置参数" class="itemRemark " prop="configParams ">
                <Input type="textarea" v-model="rowData.configParams" placeholder="请输入配置参数" />
            </FormItem>
            <FormItem label="商品参数"  title="商品参数" class="itemRemark " prop="productParams ">
                <Input type="textarea" v-model="rowData.productParams" placeholder="请输入商品参数" />
            </FormItem>
            <FormItem label="对接描述"  class="itemRemark" prop="joinDepict">
                <Input type="textarea" v-model="rowData.joinDepict" placeholder="请输入对接描述" />
            </FormItem>
            
        </Form>
    </Modal>
</template>

<script>
import { IP_ChannelLinkAdd,IP_ChannelLinkEdit} from '@/api/issueSystem/channelLink.js'

export default{
    data(){
        return{
            ruleValidate:{
                gameId:[
                    { required: true, type: 'number', message: '请选择游戏', trigger: 'change' }
                ],
                snKey:[
                    { required: true, message: '渠道Key不能为空', trigger: 'blur' }
                ],
                zoneKey:[
                    { required: true,message: '专区标识不能为空', trigger: 'blur' },
                    { type: 'string', max:16,message: '最大长度为16个字符', trigger: 'blur' }
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
            this.$refs["IP_ChannelLinkAddRef"].validate((valid) => {
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
            let data = this.actionType == 'edit' ? await IP_ChannelLinkEdit(this.rowData) : await IP_ChannelLinkAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_ChannelLinkAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_ChannelLinkAddRef")
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
.IP_ChannelLinkAddRef{

}
    
</style>
    