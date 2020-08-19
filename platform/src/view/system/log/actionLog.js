import { PA_getActionLogData } from '@/api/system/log/actionLog.js'
import { fixedTableHeader } from '@/utils/help.js'
import roleAdd from '@/component/system/roleAdd.vue'
import { mapGetters } from 'vuex'

export default{
    name:"actionLog",
    components:{
        roleAdd
    },
    data(){
        return{
            data:[],
            pageTotal:0,
            titleConfig: [
                {
                    title: '日志编号',
                    key: 'operId',
                    minWidth:120
                },
                {
                    title: '系统模块',
                    key: 'title',
                    minWidth:120
                },
                {
                    title: '操作类型',
                    key: 'businessType',
                    minWidth:120
                },
                {
                    title: '请求方式',
                    key: 'requestMethod',
                    minWidth:120
                },
                {
                    title: '操作人员',
                    key: 'operName',
                    minWidth:120
                },
                {
                    title: '主机',
                    key: 'operIp',
                    minWidth:120
                },
                {
                    title: '操作地点',
                    key: 'operLocation',
                    minWidth:120
                },
                {
                    title: '返回状态',
                    key: 'status',
                    slot:'status',
                    minWidth:80
                },
                {
                    title: '创建时间',
                    key: 'operTime',
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
                beginTime:'',
                endTime:''
            },
            actionType:'',
            rowData:{}
        }
    },
    mounted(){
        this.postOrganizational(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'logTable');
    },
    methods:{
        //获取组织架构的数据
        async postOrganizational(param){
            this.loading = true;
            delete param.created;
            let data = await PA_getActionLogData(param);
            this.menuData = data.data;
            this.pageTotal = data.total;
            setTimeout(e=>{this.loading = false;},800)
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
                status:"0",
                remark:"",
                menuIds:[]
            };
        },
        edit (row,index) {
            row = row.roleId ? row : this.selectRow;
            if(row.roleId){
                this.showAdd = true;
                this.actionType = 'edit';
                this.rowData= row;
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        deleted (row,index) {
            this.$Modal.confirm({
                title:'系统提示',
                content:`确定要删除【${row.roleName}】这角色吗?`,
                okText: '确定删除',
                cancelText:'取消',
                closable:true,
                onOk:async () => {
                  let data = await PA_postRoleDelete({roleId:this.selectRow.roleId});
                  if(data.code == 200){
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
    },
    computed:{
        ...mapGetters(["getViewPort"]),
    },
    watch:{
        getViewPort:{
            handler (newVal){
                fixedTableHeader(newVal,'logTable',this)
            },
            deep:true
        },
    }
}