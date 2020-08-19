import { PA_getRoleData,PA_postRoleDelete } from '@/api/system/role.js'
import { fixedTableHeader } from '@/utils/help.js'
import { mapGetters } from 'vuex'
import roleAdd from '@/component/system/roleAdd.vue'
import customColumns from 'public-component-ui/utils/common/customColumns.vue'

export default{
    name:'role',
    components:{
        roleAdd,
        customColumns
        // roleAdd:resolve => require(["@/component/system/roleAdd.vue"],resolve)
        // roleAdd:() => import("@/component/system/roleAdd.vue")
    },
    data(){
        return{
            data:[],
            pageTotal:0,
            titleConfig: [
                {
                    title: '角色编号',
                    key: 'roleId',
                    minWidth:120
                },
                {
                    title: '角色名称',
                    key: 'roleName',
                    minWidth:120
                },
                {
                    title: '角色编码',
                    key: 'roleKey',
                    minWidth:120
                },
                {
                    title: '显示顺序',
                    key: 'roleSort',
                    slot:'roleSort',
                    minWidth:120
                },
                {
                    title: '状态',
                    key: 'status',
                    slot:'status',
                    minWidth:80
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    minWidth:120
                },
                {
                    title: '操作',
                    slot: 'action',
                    align:'center',
                    minWidth:220
                }
            ],
            tableHeight:0,
            menuData: [],
            showAdd:false,
            loading:false,
            selectRow:{},
            menuQuery:{
                paging:{
                    pageIndex: 1,
                    pageSize: 10
                },
                roleName: undefined,
                roleKey: undefined,
                status: undefined,
                created:'',
                beginTime:'',
                endTime:''
            },
            actionType:'',
            rowData:{},
            dropdown: [],                         //checkbox 的list;
        }
    },
    mounted(){
        this.postOrganizational(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'roleTable')
    },
    methods:{
        //获取组织架构的数据
        async postOrganizational(param){
            this.loading = true;
            let data = await PA_getRoleData(param);
            this.menuData = data.data;
            this.pageTotal = data.total;
            this.loading = false;
        },
        query(){  //查询
            this.postOrganizational(this.menuQuery)
        },
        reset(){  //重置
            this.$refs['roleForm'].resetFields();
        },
        add(){
            this.showAdd = true; 
            this.actionType = 'add';
            this.rowData = {
                roleName:'',
                roleKey:'',
                roleSort:'',
                status:"1",
                remark:"",
                menuIds:[]
            };
        },
        edit (row,index) {
            let rowData = row.roleId ? row : this.selectRow;
            if(rowData.roleId){
                this.showAdd = true;
                this.actionType = 'edit';
                this.rowData= JSON.parse(JSON.stringify(rowData));
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        jurdiction(row){
            let rowData = row.roleId ? row : this.selectRow;
            if(this.selectRow.roleId){
                this.showAdd = true;
                this.actionType = 'scope';
                this.rowData = JSON.parse(JSON.stringify(rowData));
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        deleted (row,index) {
            let rowData = row.roleId ? row : this.selectRow;
            if(rowData.roleId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.roleName}】这角色吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                    let data = await PA_postRoleDelete({roleId : rowData.roleId});
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
        dropDownList(name){
            if(this.selectRow.roleId){
                switch(name){
                    case 'edit':
                        this.edit(this.selectRow);
                        break;
                    case 'jurdiction':
                        this.jurdiction(this.selectRow);
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
        pageChange(page){
            this.menuQuery.paging.pageIndex = page;
            this.postOrganizational(this.menuQuery)
        },
        pageSizeChange(pageSize){
            this.menuQuery.paging.pageSize = pageSize;
            this.postOrganizational(this.menuQuery)
        },
        roleColse(bool){ 
            this.showAdd=bool;
        },
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        dataPickerOk(value){
            this.menuQuery.beginTime = value[0].split(' ')[0];
            this.menuQuery.endTime = value[1].split(' ')[0];
        },
        timeClear(){
            this.menuQuery.beginTime = '';
            this.menuQuery.endTime = '';
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
                fixedTableHeader(newVal,'roleTable',this)
            },
            deep:true
        },
    }
}