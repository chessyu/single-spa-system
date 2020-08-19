
import { IP_getExternalAccessData ,IP_ExternalAccessDelete} from '@/api/issueSystem/externalAccess.js'
import { fixedTableHeader } from 'public-component-ui/utils/help.js'
import { mapGetters } from 'vuex'
import externalAccessAdd from '@/component/issueSystem/externalAccessAdd.vue'    //子组件 新增，修改的界面
import customColumns from '@/component/common/customColumns.vue'

export default{
    name:'externalAccess',
    components:{
        externalAccessAdd,
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
                gameId:null,                 
                zoneKey:'',
                tsKey:'',
            },
            titleConfig: [                     //iview 表头配置
                // {
                //     title: '游戏名称',
                //     key: 'gameName',
                //     ellipsis:true,
                //     tooltip:true,
                //     minWidth:120
                // },
                {
                    title: '游戏ID',
                    key: 'gameId',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '游戏名称',
                    key: 'gameName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '第三方Key',
                    key: 'tsKey',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '专区标识',
                    key: 'zoneKey',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '第三方的静态参数(json格式保存)',
                    key: 'staticParams',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:350
                },
                {
                    title: '描述',
                    key: 'depict',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
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
        this.tableHeight = fixedTableHeader(this.getViewPort,'externalAccessTable')
    },
    methods:{
        //获取表格数据
        async postOrganizational(param){  
            this.loading = true;
            let data = await IP_getExternalAccessData(param);
            
            this.menuData = data.data;
            this.menuData.forEach(e => {
                this.gameList.forEach(h => {
                    if(e.gameId == h.value){
                        e.gameName = h.label
                    }
                })
            })
            this.pageTotal = data.total;
            this.loading = false;
        },
        // 查询
        query(){
            this.postOrganizational(this.menuQuery)
        },
        // 重置
        reset(){  
            this.$refs['externalAccessForm'].resetFields();
        },
        // 新增
        add(){
            this.showModal = true;
            this.actionType = 'add';
            this.rowData = {
                gameId:null,
                tsKey:'',
                zoneKey:'',
                staticParams:'',
                depict:'',
            };                                                                     //改
        },
        // 修改
        edit (row,index) {
            row = row.gameTsId ? row : this.selectRow;                                  //需要更改  当前实例的ID
            if(row.gameTsId){
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
            let rowData = row.gameTsId ? row : this.selectRow;
            if(this.selectRow.gameTsId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.tsKey}】这条数据吗?`,    //需要更改  当前实例的ID
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await IP_ExternalAccessDelete({gameTsId:rowData.gameTsId});
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
        ...mapGetters(["getViewPort","getCacheData","getUserData"]),
        gameList(){
            return this.getCacheData.game;
        },
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
                fixedTableHeader(newVal,'externalAccessTable',this)
            },
            deep:true
        },
    }
}
    