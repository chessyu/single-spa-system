
import { IP_getGameSysData , IP_GameSysDelete} from '@/api/issueSystem/gameSys.js'
import { fixedTableHeader } from 'public-component-ui/utils/help.js'
import { mapGetters } from 'vuex'
import gameSysAdd from '@/component/issueSystem/gameSysAdd.vue'    //子组件 新增，修改的界面
import gameSysPwoer from '@/component/issueSystem/gameSysPwoer.vue'    //子组件 新增，修改的界面
import customColumns from '@/component/common/customColumns.vue'


export default{
    name:'gameSys',
    components:{
        gameSysAdd,
        gameSysPwoer,
        customColumns,
    },
    data(){
        return{
            pageTotal:0,                      //默认表格总条数
            menuQuery:{                     //查询条件默认参数
                paging:{
                    pageIndex: 1,
                    pageSize: 10
                },
                gameName:'',
            },
            titleConfig: [                     //iview 表头配置
                {
                    title: '游戏Id',
                    key: 'gameId',
                    minWidth:80
                },
                {
                    title: '游戏名称',
                    key: 'gameName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '游戏描述',
                    key: 'gameDesc',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '扩展字段',
                    key: 'gameExt',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:250
                },
                {
                    title: '游戏的MD5签名密码(我们生成,分配给游戏)',
                    key: 'gameSecret',
                    resizable:true,
                    ellipsis:true,
                    tooltip:true,
                    minWidth:350
                },
                {
                    title: '游戏登录地址',
                    key: 'gameUrl',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '游戏支付回调地址',
                    key: 'callbackUrl',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:240
                },
                {
                    title: '设置禁言地址',
                    key: 'banUrl',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:250
                },
                {
                    title: '设置封号地址',
                    key: 'gameUrl',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:250
                },
                {
                    title: '创建人',
                    key: 'createUser',
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
            pwoerShow:false,
            dropdown: [],                         //checkbox 的list;

        }
    },
    mounted(){
        this.postOrganizational(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'gameSysTable');
        
    },
    methods:{
        //获取表格数据
        async postOrganizational(param){  
            this.loading = true;
            let data = await IP_getGameSysData(param);
            
            this.menuData = data.data;
            this.pageTotal = data.total;
            this.loading = false;
        },
        // 查询
        query(){
            this.postOrganizational(this.menuQuery)
        },
        // 重置
        reset(){  
            this.$refs['gameSysForm'].resetFields();
        },
        // 新增
        add(){
            this.showModal = true;
            this.actionType = 'add';
            this.rowData = {
                gameId:0,
                gameName:'',
                gameDesc:'', 
                gameUrl:"",
                callbackUrl:"",
                banUrl:"",
                gameSecret:'',
                sealUrl:'',
                chatType:'',
                gameExt:"",
            };
        },
        // 修改
        edit (row,index) {
            row = row.gameId ? row : this.selectRow;
            if(row.gameId){
                this.showModal = true;
                this.actionType = 'edit';
                this.rowData= JSON.parse(JSON.stringify(row));
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        // 删除
        deleted (row,index) {
            let rowData = row.gameId ? row : this.selectRow;
            if(this.selectRow.gameId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.gameName}】这条数据吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await IP_GameSysDelete({gameId:rowData.gameId});
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
        //权限
        power(row){
            row = row.gameId ? row : this.selectRow;
            if(row.gameId){
                this.pwoerShow = true;
                this.rowData= JSON.parse(JSON.stringify(row));
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        //关闭弹层
        pwoerClose(bool){
            this.pwoerShow = bool;
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
        modalClose(){
            this.showModal = false;
        },
        // 点击行触发，返回行数据
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        // 当日期改变时赋值
        dataPickerOk(value){
            this.menuQuery.beginTime = value[0].split(' ')[0];
            this.menuQuery.endTime = value[1].split(' ')[0];
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
                if(this.dropdown.includes(e.key) || !(e.hasOwnProperty("key"))) return e;
            });
            if(columns.length === 0) columns = this.titleConfig;
            return columns;
        },
        userId(){
            return this.getUserData.userId
        }
    },
    watch:{
        getViewPort:{
            handler (newVal){
                fixedTableHeader(newVal,'gameSysTable',this)
            },
            deep:true
        },
    }
}
    