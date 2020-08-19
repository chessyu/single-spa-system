import { PA_getMenuList, PA_postMenuDelete } from '@/api/system/menu.js'
import { formatTree, selectNodeList } from '@/utils/dataFormat.js'
import { fixedTableHeader } from '@/utils/help.js'
import { mapGetters } from 'vuex'
import menuAdd from '@/component/system/menuAdd.vue'
import customColumns from 'public-component-ui/utils/common/customColumns.vue'


export default{
    name:'menuT',
    data(){
        return{
            menuQuery:{
                menuName:'',
                status:'',
                system:''
            },
            system:[
                {
                    value:'11',
                    text:'基础平台'
                },
                {
                    value:'12',
                    text:'基础数据'
                },
                {
                    value:'13',
                    text:'发行平台'
                },
                {
                    value:'14',
                    text:'中控平台'
                },
                {
                    value:'15',
                    text:'运营分析'
                },
                {
                    value:'16',
                    text:'渠道平台'
                },
                {
                    value:'17',
                    text:'ERP系统'
                },
                {
                    value:'18',
                    text:'项目管理'
                },
                {
                    value:'19',
                    text:'嗨嗨游平台'
                },
            ],
            titleConfig: [
                {
                    title: '菜单名称',
                    key: 'menuName',
                    tree: true,
                    minWidth:180
                },
                {
                    title: '数据类型',
                    key: 'menuType',
                    minWidth:120,
                    slot:'menuType'
                },
                {
                    title: '图标',
                    key: 'icon',
                    slot:'icon',
                    minWidth:80
                },
                {
                    title: '权限',
                    key: 'perms',
                    minWidth:220
                },
                {
                    title: '排序',
                    key: 'orderNum',
                    slot:'orderNum',
                    minWidth:80
                },
                {
                    title: '路由',
                    key: 'component',
                    minWidth:220
                },
                {
                    title: '状态',
                    key: 'visible',
                    slot:'visible',
                    minWidth:80
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    minWidth:240
                },
                {
                    title: '操作',
                    slot: 'action',
                    align:'center',
                    minWidth:200
                }
            ],
            showAdd:false,
            actionType:'',
            tableHeight:0,
            loading:false,
            menuData: [],
            selectRow:{},
            rowData:{},
            menuList:[],
            dropdown: [],                         //checkbox 的list;
        }
    },
    mounted(){
        this.init(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'menuTable')
        console.log(this.tableHeight)
    },
    methods:{
        async init(query){
            this.loading = true;
            let data = await PA_getMenuList(query);
            let formatData = formatTree(data.data,'menuId');
            this.menuData = formatData;
            this.menuList = formatData;
            this.loading = false;
        },
        query(){
            this.init(this.menuQuery)
        },
        add(row){
            this.showAdd = true;
            this.actionType = 'add';
            this.rowData = {
                parentId: this.selectRow.menuId ? this.selectRow.menuId : undefined,
                menuType:'M', 
                icon:'',
                menuName:'',
                orderNum:0,
                path:'',
                component:'',
                perms:'',
                visible:"1",
                remark:""
            };
        },
        edit(row) {
            row = row.menuId ? row : this.selectRow;
            if(row.menuId){
                this.showAdd = true;
                this.actionType = 'edit';
                this.rowData = JSON.parse(JSON.stringify(row)); 
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        deleted (row) {
            let rowData = row.menuId ? row : this.selectRow;
            if(rowData.menuId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.menuName}】这菜单项吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                    let data = await PA_postMenuDelete({menuId :rowData.menuId});
                    if(data.code == 0){
                        this.$Message.success('删除成功');
                        let data = selectNodeList(this.menuData,rowData.parentId,"menuId")
                        data.children = data.children.filter(e => e.menuId !== rowData.menuId);
                        this.$set(this.menuData)
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
        reset(){  //重置
            this.$refs['menuForm'].resetFields();
        },
        // 关闭新增弹出层的回调
        dictColse(bool){
            this.showAdd = bool;
        },
        dropDownList(name){ 
            if(this.selectRow.menuId){
                switch(name){
                    case 'edit':
                        this.edit(this.selectRow);
                        break;
                    case 'deleted':
                        this.deleted(this.selectRow);
                        break;
                }
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            } 
        },
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        changeDate(actionType,rowdata){  //子组件新增修改数据后。不刷界面
            this.$set(this.menuData)
            if(actionType == "add"){
                let data = selectNodeList(this.menuData,this.selectRow.menuId,"menuId")
                data.children ? data.children : data.children = [];
                data.children.push(rowdata)
                this.$set(this.menuData)
            }
            if(actionType == "edit"){
                let data = selectNodeList(this.menuData,rowdata.menuId,"menuId")
                delete rowdata.children;
                Object.assign(data,rowdata)
                
            }
        },
        //动态勾选table列时 重新赋值
        changeDropdown(value){
            this.dropdown = value;
        },
    },
    components:{
        menuAdd,
        customColumns
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
                fixedTableHeader(newVal,'menuTable',this)
            },
            deep:true
        },
    }
}