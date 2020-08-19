
import { IP_getCascadeSelect} from '@/api/common.js'
import { IP_getPayOrderData ,IP_PayOrderAgainDelivery} from '@/api/issueSystem/payOrder.js'
import { fixedTableHeader } from 'public-component-ui/utils/help.js'
import { mapGetters, mapActions } from 'vuex'
import payOrderAdd from '@/component/issueSystem/payOrderAdd.vue'    //子组件 新增，修改的界面
import customColumns from '@/component/common/customColumns.vue'

export default{
    name:'payOrder',
    components:{
        payOrderAdd,
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
                gameId :null,                 
                zoneKey :'',
                snKey :'',
                openId:'',
                snOpenId:'',
                issueOrderNo:'',
                snOrderNo:'',
                gameOrderNo:'',
                paymentStatus:'',
                paymentTime:'',
                deliveryStatus:'',
                deliveryTime:''

            },
            titleConfig: [                     //iview 表头配置
                {
                    title: '渠道key',
                    key: 'snKey',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:100
                },
                {
                    title: '专区标识',
                    key: 'zoneKey',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
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
                    title: '区服ID',
                    key: 'areaId',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:80
                },
                {
                    title: '渠道OpenID',
                    key: 'snOpenId',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '玩家角色ID',
                    key: 'payOrderId',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '区服名称',
                    key: 'areaName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '平台OpenId',
                    key: 'openId',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '玩家角色名称',
                    key: 'roleName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '角色等级',
                    key: 'roleLevel',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:100
                },
                {
                    title: '商品ID',
                    key: 'productId',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '商品名称',
                    key: 'productName',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '商品描述',
                    key: 'productDescribe',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: 'VIP等级',
                    key: 'vipGrade',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '平台订单号',
                    key: 'issueOrderNo',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '渠道订单号',
                    key: 'snOrderNo',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '游戏订单号',
                    key: 'gameOrderNo',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '充值金额(单位:分)',
                    key: 'amount',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '支付状态',
                    key: 'paymentStatus',
                    slot:'paymentStatus',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '支付时间',
                    key: 'paymentTime',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '发货状态',
                    key: 'deliveryStatus',
                    slot:'deliveryStatus',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '发货完成时间',
                    key: 'deliveryTime',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '透传参数',
                    key: 'extension',
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
            zoneList:[],                           //专区标识列表
            snList:[],                               //渠道key值
            dropdown: [],                         //checkbox 的list;
        }
    },
    mounted(){
        // this.postOrganizational(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'payOrderTable')
    },
    methods:{
        //获取表格数据
        async postOrganizational(param){  
            this.loading = true;
            let data = await IP_getPayOrderData(param);
            
            if(data.code == 0){
                this.menuData = data.data;
                this.menuData.forEach(e => {
                    this.gameList.forEach(h => {
                        if(e.gameId == h.value){
                            e.gameName = h.label
                        }
                    })
                })
                this.pageTotal = data.total;
            }
            this.loading = false;
        },
        // 查询
        query(){
            let newMenuQuery = this.$plugins.formatDateToString(['paymentTime','deliveryTime'],this.menuQuery);
            this.postOrganizational(newMenuQuery)
        },
        // 重置
        reset(){  
            this.$refs['payOrderForm'].resetFields();
        },
        again(row,index){  //重新发货
            let rowData = row.payOrderId ? row : this.selectRow;
            if(this.selectRow.payOrderId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要重新发货吗?`,    //需要更改  当前实例的ID
                    okText: '确定',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await IP_PayOrderAgainDelivery({payOrderId:rowData.payOrderId});
                      if(data.code == 0){
                        this.$Message.success(data.msg);
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
        // 新增
        add(){
            this.showModal = true;
            this.actionType = 'add';
            this.rowData = {};                                                                     //改
        },
        // 修改
        edit (row,index) {
            row = row.payOrderId ? row : this.selectRow;                                  //需要更改  当前实例的ID
            if(row.payOrderId){
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
            let rowData = row.payOrderId ? row : this.selectRow;
            if(this.selectRow.payOrderId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.postName}】这条数据吗?`,    //需要更改  当前实例的ID
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await IP_PayOrderAgainDelivery({payOrderId:rowData.payOrderId});
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
            this.query()
        },
        // 改变当前页条数时触发
        pageSizeChange(pageSize){
            this.menuQuery.paging.pageSize = pageSize;
            this.query()
        },
        // 关闭新增弹出层的回调
        modalClose(){
            this.showModal = false;
        },
        // 点击行触发，返回行数据
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        async postUrl({lookup,params}){
            let data  = await IP_getCascadeSelect({lookup,params});
            if(data.code == 0){
                let obj = {},children={};
                children[lookup +"_&_"+params] = data.data;
                obj[lookup] = Object.assign(this.getCacheData[lookup] || {}  ,children);
                this.setCacheData(obj)
                this[lookup+'List'] = data.data;
                console.log(this.getCacheData);
            }
        },
        //游戏选择列改变事件
        gameSelect(value){
            this.menuQuery.snKey = null;
            this.snList = [];
            let list = this.getCacheData.zone || {};
            let keys = Object.keys(list).map(e => Number(e.split('_&_')[1]));
            if(keys.includes(value)){
                this.zoneList = list['zone'+"_&_"+value];
                return;
            }
            this.postUrl({lookup:'zone',params:value});
        },
        //专区选择列改变事件
        zoneSelect(value){
            let list = this.getCacheData.sn || {};
            let keys = Object.keys(list).map(e => e.split('_&_')[1]);
            if(keys.includes(value)){
                this.snList = list['sn'+"_&_"+value];
                return;
            }
            this.postUrl({lookup:'sn',params:value});
        },
        changeDropdown(value){
            this.dropdown = value;
        },
        ...mapActions(["setCacheData"])
    },
    computed:{
        ...mapGetters(["getViewPort","getCacheData","getUserData"]),
        gameList(){
            return this.getCacheData.game;
        },
        paymentStatus(){   //支付状态
            return this.getCacheData.dict.filter(e => e.dictType === "paymentStatus");
        },
        deliveryStatus(){   //发货状态
            return this.getCacheData.dict.filter(e => e.dictType === "deliveryStatus");
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
                fixedTableHeader(newVal,'payOrderTable',this)
            },
            deep:true
        }
    }
}
    