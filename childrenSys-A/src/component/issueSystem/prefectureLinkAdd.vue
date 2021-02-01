
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable 
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="IP_PrefectureLinkAddRef" :model="rowData"  :rules="ruleValidate" :label-width="130">
            <FormItem label="游戏id"  class="form_item"  prop="gameId">
                 <Select v-model="rowData.gameId"  placeholder="请选择游戏" clearable>
                    <Option v-for="(item,index) in gameList" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="专区标识" title="专区标识" class="form_item" prop="zoneKey">
                <Input v-model="rowData.zoneKey" placeholder="请输入专区标识" />
            </FormItem>
            <FormItem label="对接描述" title="对接描述"  class="form_item" prop="zoneDepict">
                <Input v-model="rowData.zoneDepict" placeholder="请输入专区描述" />
            </FormItem>
            <FormItem label="支付回调" title="支付回调地址"  class="form_item" prop="callbackUrl">
                <Input v-model="rowData.callbackUrl" placeholder="请输入游戏支付回调地址" />
            </FormItem>
            <FormItem label="登录地址" title="游戏登录地址"  class="form_item" prop="gameUrl">
                <Input v-model="rowData.gameUrl" placeholder="请输入游戏登录地址" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { IP_PrefectureLinkAdd,IP_PrefectureLinkEdit} from '@/api/issueSystem/prefectureLink.js'

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
                zoneDepict:[
                    { required: true, message: '专区描述不能为空', trigger: 'blur' }
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
            this.$refs["IP_PrefectureLinkAddRef"].validate((valid) => {
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
            let data = this.actionType == 'edit' ? await IP_PrefectureLinkEdit(this.rowData) : await IP_PrefectureLinkAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_PrefectureLinkAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_PrefectureLinkAddRef")
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
    