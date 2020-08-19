import { PA_getOrganizational, PA_getUserList, PA_postUserListDelete, PA_resetUserPassword, PA_getRoleDetailData } from '@/api/system/user.js'
import  { fixedTableHeader }  from '@/utils/help.js'
import {childrenFindFatherTree,selectNodeList} from '@/utils/dataFormat.js'
import userAdd from '@/component/system/userAdd.vue'
import {mapGetters} from 'vuex'
import customColumns from 'public-component-ui/utils/common/customColumns.vue'

export default{
    name:'user',
    components:{
        userAdd,
        customColumns
    },
    data(){
        return{
            // queryDep:'',
            data:[],
            tableHeight:0,
            loading:false,
            pageTotal:0,
            menuQuery:{
                paging:{
                    pageIndex: 1,
                    pageSize: 10
                },
                deptId:100,
                nickName:'',
                userName:'',
                status:'',
                beginTime:'',
                endTime:'',
                created:''
            },
            system:[
                {
                    value:'PA',
                    text:'基础平台'
                },
                {
                    value:'BD',
                    text:'基础数据'
                },
                {
                    value:'FA',
                    text:'发行平台'
                },
                {
                    value:'ZA',
                    text:'中控平台'
                },
                {
                    value:'YA',
                    text:'运营分析'
                },
                {
                    value:'CA',
                    text:'渠道平台'
                },
                {
                    value:'ERP',
                    text:'ERP系统'
                },
                {
                    value:'XS',
                    text:'项目管理'
                },
                {
                    value:'HA',
                    text:'嗨嗨游平台'
                },
            ],
            titleConfig: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'nickName',
                    minWidth:120
                },
                {
                    title: '用户账号',
                    key: 'userName',
                    minWidth:120
                },
                {
                    title: '部门',
                    key: 'deptName',
                    minWidth:120
                },
                {
                    title: '联系电话',
                    key: 'phone',
                    minWidth:180
                },
                {
                    title: '邮箱',
                    key: 'email',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '性别',
                    key: 'sex',
                    slot:'sex',
                    minWidth:80
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
                    minWidth:240
                },
                {
                    title: '操作',
                    align:'center',
                    slot: 'action',
                    width:180
                }
            ],
            menuData: [],
            selectRow:{},
            showAdd:false,
            actionType:'add',
            rowData:{},
            muipt:[],
            split:0.16,
            dropdown: [],                         //checkbox 的list;
        }
    },
    mounted(){
        this.postOrganizational();  //获取组织架构tree数据
        this.PA_getUserList(this.menuQuery); //取部门下的所有用户
    },
    methods:{
        //获取组织架构的数据
        async postOrganizational(){  
            let data = await PA_getOrganizational();
            data.data[0].expand = true;
            this.data = data.data;
        },
        async PA_getUserList(param){ 
            this.loading = true;
            let user = await PA_getUserList(param);
            this.menuData = user.data;
            this.pageTotal = user.total;
            this.loading = false;
        },
        query(){
            this.PA_getUserList(this.menuQuery);
            this.tableHeight = fixedTableHeader(this.getViewPort,'userTable')
        },
        reset(){
            this.$refs['userForm'].resetFields();
            this.menuQuery.beginTime = '';
            this.menuQuery.endTime = '';
        },
        onTreeSelect(row){
            this.menuQuery.deptId = row[0].id;
            this.PA_getUserList(this.menuQuery)
        },
        dataPickerOk(value){
            this.menuQuery.beginTime = value[0].split(' ')[0];
            this.menuQuery.endTime = value[1].split(' ')[0];
        },
        timeClear(){
            this.menuQuery.beginTime = '';
            this.menuQuery.endTime = '';
        },
        pageChange(page){
            this.menuQuery.paging.pageIndex = page;
            this.PA_getUserList(this.menuQuery)
        },
        pageSizeChange(pageSize){
            this.menuQuery.paging.pageSize = pageSize;
            this.PA_getUserList(this.menuQuery)
        },
        add(){
            this.showAdd = true; 
            this.actionType = 'add';
            this.rowData = {
                deptId: this.menuQuery.deptId,
                email: "",
                nickName: "",
                password: "123456",
                phone: "",
                postIds: '',
                remark: "",
                roleIds: '',
                sex: "1",
                status: "1",
                userName: "",
            }
        },
        edit(row){
            let rowData = row.userId ? row : this.selectRow;
            if(rowData.userId){
                this.showAdd = true;
                this.actionType = 'edit';
                // this.rowData = JSON.parse(JSON.stringify(rowData));
                this.getUserDetailData(rowData);    //请求用户一条明细数据。内含 角色组，职位组
                
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            } 
            
        },
        deleted(row){
            if(this.muipt.length){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除已勾选的用户吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                    let data = await PA_postUserListDelete({userIds:this.muipt});
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
                return;
            }
            let rowData = row.userId ? row : this.selectRow;
            if(rowData.userId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.nickName}】这用户吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                    let data = await PA_postUserListDelete({userId:rowData.userId});
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
        onSelect(currentRow, row){
            let usersId = currentRow.map(e => e.userId);
             this.muipt = usersId.filter(e => e > 1);
        },
        async passwordReset(row){
            this.$Modal.confirm({
                title:'系统提示',
                content:`确定要重置【${row.nickName}】这用户的密码吗?`,
                okText: '确定重置',
                cancelText:'取消',
                closable:true,
                onOk:async () => {
                    let data = await PA_resetUserPassword({userId:row.userId,password:'123456'});
                    if(data.code == 0){
                        this.$Message.success(data.msg);
                    }else{
                        this.$Message.error({
                            content:data.msg,
                            duration:3
                        })
                    }
                },
            })
        },
        async getUserDetailData(row){
            let data = await PA_getRoleDetailData({userId:row.userId});
            if(data.code == 0){
                row["postIds"] = data.data.postIds;
                row["roleIds"] = data.data.roleIds;
                let deptIds = childrenFindFatherTree(this.data ,data.data.user.deptId).reverse();
                deptIds.shift();
                row.deptId = deptIds.pop();
                this.rowData = JSON.parse(JSON.stringify(row));
            }
        },
        dropDownList(name){
            if(this.selectRow.userId){
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
        roleColse(bool){
            this.showAdd=bool;
        },
        getParent(data, childrenId) {
            for (var i in data) {
                if (data[i].id == childrenId) {
                    return [data[i].id];
                }
                if (data[i].children) {
                    var ro = this.getParent(data[i].children, childrenId);
                    if (ro !== undefined) {
                    return ro.concat(data[i].id);
                    }
                }
            }

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
                fixedTableHeader(newVal,'userTable',this)
            },
            deep:true
        },
    }
}