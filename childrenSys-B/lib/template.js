/**
 * 生成模块文件。
 */
const systemConfig = require('../systemConfig.json')
const path = require('path')
const fs = require('fs')
const basePath = path.resolve(__dirname,'../src')


async function createTemplate(answers){
    const sysName = systemConfig.systemCode;
    const tfFileName = answers.fileName.substring(0,1).toUpperCase() + answers.fileName.substring(1)  //首字母转大写

    /**
     * 生成vue Template
     */
    const VueTemplate = `
    <template>
        <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="${answers.fileName}Form" :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="岗位名称"  class="itemWidth"  prop="postName">
                        <Input v-model="menuQuery.postName" placeholder="请输入岗位名称" />
                    </FormItem>
                    <FormItem label="岗位职称" class="itemWidth" prop="postCode">
                        <Input v-model="menuQuery.postCode" placeholder="请输入岗位职称" />
                    </FormItem>
                    <FormItem label="状态"  class="itemWidth" prop="status">
                        <Select v-model="menuQuery.status">
                            <Option value="0">正常</Option>
                            <Option value="1">禁用</Option>
                        </Select>
                    </FormItem>
                    <FormItem  class="itemWidth">
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table">
            <!-- ①id 是唯一的，动态计算表格高度时会用到 ②v-buttomPower 按钮权限[系统简称:模块名:文件名:按钮名称]-->
                <div  class="table" id="${answers.fileName}Table">
                    <div class="buttonGroup">
                        <Button type="primary" @click="add" v-buttomPower="['${sysName}:${answers.hasModuleName}:${answers.fileName}:add']">
                        <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" @click="edit" v-buttomPower="['${sysName}:${answers.hasModuleName}:${answers.fileName}:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['${sysName}:${answers.hasModuleName}:${answers.fileName}:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                        <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'${sysName}_${answers.fileName}_'+userId" @changeDropdown="changeDropdown"></custom-columns>
                    </div>
                    <Table :height="tableHeight" row-key="id" :columns="costemColumns" :data="menuData" highlight-row  :loading="loading" @on-current-change="onCurrentChange" >
                        <template slot-scope="{ row }" slot="postSort">
                            <Tag color="cyan">{{row.postSort}}</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="status">
                            <Tag color="success" v-if="row.status == '0'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['${sysName}:${answers.hasModuleName}:${answers.fileName}:edit']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom"  @click="deleted(row,index)"  v-buttomPower="['${sysName}:${answers.hasModuleName}:${answers.fileName}:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
                <div class="page">
                     <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/> 
                </div>
            </div>
        </div>
        <${answers.fileName}Add :showModal="showModal" :actionType="actionType" :rowData="rowData"  @modalClose="modalClose" @reload="query"></${answers.fileName}Add>
        </div>
    </template>

    <script src="./${answers.fileName}.js"></script>
    <style lang="less" scoped>

    </style>
    `

    /**
     * 生成js 文件
     */
    const VueJs =`
import { ${sysName}_get${tfFileName}Data ,${sysName}_${tfFileName}Delete} from '@/api/${answers.hasModuleName}/${answers.fileName}.js'
import { fixedTableHeader } from 'public-component-ui/utils/help.js'
import { mapGetters } from 'vuex'
import ${answers.fileName}Add from '@/component/${answers.hasModuleName}/${answers.fileName}Add.vue'    //子组件 新增，修改的界面
import customColumns from '@/component/common/customColumns.vue'

export default{
    components:{
        ${answers.fileName}Add,
        customColumns
    },
    data(){
        return{
            pageTotal:0,                      //默认表格总条数
            menuQuery:{                     //查询条件默认参数
                paging:{
                    pageIndex: 1,
                    pageSize: 10
                },
                postCode:'',                 
                status:'',
                postName:'',
            },
            titleConfig: [                     //iview 表头配置
                {
                    title: '表头一',
                    key: 'postName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '表头二',
                    key: 'postCode',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '表头三',
                    key: 'postSort',
                    slot: 'postSort',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '表头四',
                    key: 'status',
                    slot: 'status',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '创建人',
                    key: 'createUser',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '修改人',
                    key: 'updateUser',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '修改时间',
                    key: 'updateTime',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '操作',
                    slot: 'action',
                    align:'center',
                    minWidth:180
                }
            ],
            tableHeight:0,                      //表格高度
            menuData: [],                        //表格数据源
            loading:false,                        //是否加载loading
            showModal:false,                  //显示新增候页面
            selectRow:{},                        //表格单选时的数据
            actionType:'add',                 //默认弹出界面是新增类型
            rowData:{},                           //传入子组件时所需要的数据 -> 当前选中行数据
            dropdown: [],                         //checkbox 的list;

        }
    },
    mounted(){
        this.postOrganizational(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'${answers.fileName}Table')
    },
    methods:{
        //获取表格数据
        async postOrganizational(param){  
            this.loading = true;
            let data = await ${sysName}_get${tfFileName}Data(param);
            this.menuData = data.data;
            this.pageTotal = data.paging.totalCount;
            this.loading = false;
        },
        // 查询
        query(){
            this.postOrganizational(this.menuQuery)
        },
        // 重置
        reset(){  
            this.$refs['${answers.fileName}Form'].resetFields();
        },
        // 新增
        add(){
            this.showModal = true;
            this.actionType = 'add';
            this.rowData = {};                                                                     //改
        },
        // 修改
        edit (row,index) {
            row = row.postId ? row : this.selectRow;                                  //需要更改  当前实例的ID
            if(row.postId){
                this.showModal = true;
                this.actionType = 'edit';
                this.rowData= JSON.parse(JSON.stringify(row));
                console.log('edit', row)
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        // 删除
        deleted (row,index) {
            let rowData = row.postId ? row : this.selectRow;
            if(this.selectRow.postId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:\`确定要删除【\${rowData.postName}】这条数据吗?\`,    //需要更改  当前实例的ID
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await ${sysName}_${tfFileName}Delete({postId:rowData.postId});
                      if(data.code == 0){
                        this.$Message.success('删除成功');
                        this.query();
                      }else{
                        this.$Message.error({
                            content:data.msg,
                            duration:3
                        })
                      }
                    },
                })
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            } 
        },
        // 切换页码变化时触发
        pageChange(page){
            this.menuQuery.paging.pageIndex = page;
            this.postOrganizational(this.menuQuery)
        },
        // 改变当前页条数时触发
        pageSizeChange(pageSize){
            this.menuQuery.paging.pageSize = pageSize;
            this.postOrganizational(this.menuQuery)
        },
        // 关闭新增弹出层的回调
        modalClose(bool){
            this.showModal = bool;
        },
        // 点击行触发，返回行数据
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        //动态勾选table列时 重新赋值
        changeDropdown(value){
            this.dropdown = value;
        },
    },
    computed:{
        ...mapGetters(["getViewPort","getUserData"]),
        costemColumns(){   //读取缓存数据 过滤掉不需要展示的列；
            let columns;
            columns = this.titleConfig.filter(e => {
                if(this.dropdown.includes(e.key)) return e;
            });
            if(columns.length === 0) columns = this.titleConfig;
            return columns;
        },
        userId(){
            return this.getUserData.userId;
        }
    },
    watch:{
        getViewPort:{
            handler (newVal){
                fixedTableHeader(newVal,'${answers.fileName}Table',this)
            },
            deep:true
        },
    }
}
    `

    /**
     * 生成接口文件
     */
    const VueInterface = `
    import request from 'public-component-ui/utils/require.js'

    const ENV_URL = process.env.${sysName}_URL;
    export const ${sysName}_get${tfFileName}Data = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/url',
            method:'post',
            data
        })

    export const ${sysName}_${tfFileName}Add = (data) =>
        request({   //新增
            url:ENV_URL+'/url',
            method:'post',
            data
        })
    
    export const ${sysName}_${tfFileName}Edit = (data) =>
        request({   //修改
            url:ENV_URL+'/url',
            method:'post',
            data
        })


    export const ${sysName}_${tfFileName}Delete = (data) =>
        request({    //删除
            url:\`\${ENV_URL}/url/\`,
            method:'post',
            data
        })

    `

    /**
     * 生成标准 新增修改 的文件
     */
    const VueAddEdit = `
    <template>
    <Modal
        v-model="show"
        :title="title"
        width="650px"
        draggable
        :closable="false"
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="${sysName}_${tfFileName}AddRef" class="formItem" :model="rowData" :rules="ruleValidate" :label-width="130">
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
import { ${sysName}_${tfFileName}Add,${sysName}_${tfFileName}Edit} from '@/api/${answers.hasModuleName}/${answers.fileName}.js'

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
            this.$refs["${sysName}_${tfFileName}AddRef"].validate((valid) => {
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
            let data = this.actionType == 'edit' ? await ${sysName}_${tfFileName}Edit(this.rowData) : await ${sysName}_${tfFileName}Add(this.rowData);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"${sysName}_${tfFileName}AddRef");
                this.$emit('modalClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('modalClose',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"${sysName}_${tfFileName}AddRef")
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
    `


    process.chdir(`${basePath}/view/${answers.hasModuleName}`) //cd
    fs.writeFileSync(`${answers.fileName}.vue`,VueTemplate); // 页面.vue
    fs.writeFileSync(`${answers.fileName}.js`,VueJs); //页面.js

    fs.writeFileSync(`${basePath}/api/${answers.hasModuleName}/${answers.fileName}.js`,VueInterface);   //接口文件 
    fs.writeFileSync(`${basePath}/component/${answers.hasModuleName}/${answers.fileName}Add.vue`,VueAddEdit);   //页面新增修改 

    setTimeout(()=>{console.log('文件创建已完成...');process.exit(0);},800)

}

 module.exports = (...args)=>{
    return createTemplate(...args)
}