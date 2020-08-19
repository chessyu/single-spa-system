
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="IP_ExternalAccessAddRef" :model="rowData" :rules="ruleValidate" :label-width="130">
            <FormItem label="游戏ID" title="游戏ID"  class="form_item"  prop="gameId">
                <Select v-model="rowData.gameId"  placeholder="请选择游戏" clearable>
                    <Option v-for="(item,index) in gameList" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="第三方Key" title="第三方Key" class="form_item" prop="tsKey">
                <Input v-model="rowData.tsKey" placeholder="请输入第三方Key" />
            </FormItem>
            <FormItem label="专区标识" title="专区标识"  class="form_item" prop="zoneKey">
                <Input v-model="rowData.zoneKey" placeholder="请输入专区标识" />
            </FormItem>
            <FormItem label="静态参数" title="第三方的静态参数(json格式保存)"  class="form_item" prop="staticParams">
                <Input type="textarea" :rows="4" v-model="rowData.staticParams" placeholder="第三方的静态参数(json格式保存)" />
            </FormItem>
            <FormItem label="描述" title="描述"  class="form_item" prop="depict">
                <Input type="textarea" v-model="rowData.depict" placeholder="请输入描述" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { IP_ExternalAccessAdd,IP_ExternalAccessEdit} from '@/api/issueSystem/externalAccess.js'

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
        gameList:{
            type:Array,
            required:true
        }
    },
    methods:{
        ok(){
            this.$refs["IP_ExternalAccessAddRef"].validate((valid) => {
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
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"IP_ExternalAccessAddRef")
        },
        async postData(){
            let data = this.actionType == 'edit' ? await IP_ExternalAccessEdit(this.rowData) : await IP_ExternalAccessAdd(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"IP_ExternalAccessAddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
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
            return this.actionType == 'add' ? '新增外部接入信息' : '修改外部接入信息';   //改
        }
    }

}
</script>

<style lang="less" scoped>

</style>
    