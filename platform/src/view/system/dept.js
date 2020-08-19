import { PA_getDeptData, PA_deleteDept } from '@/api/system/dept.js'
import { fixedTableHeader, removeTableColumns } from '@/utils/help.js'
import { formatTree,selectNodeList } from '@/utils/dataFormat.js'
import deptAdd from '@/component/system/deptAdd.vue'
import { mapGetters } from 'vuex'
import customColumns from 'public-component-ui/utils/common/customColumns.vue'


export default{
    name:'dept',
    components:{
        deptAdd,
        customColumns
    },
    data(){
        return{
            menuQuery:{
                deptName:'',
                status:'',
            },
            titleConfig: [
                {
                    title: '部门名称',
                    key: 'deptName',
                    tree: true,
                    minWidth:320
                },
                {
                    title: '负责人',
                    key: 'leader',
                    slot:'leader',
                    minWidth:120
                },
                {
                    title: '联系电话',
                    key: 'phone',
                    minWidth:180
                },
                {
                    title: '排序',
                    key: 'orderNum',
                    slot:'orderNum',
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
                    minWidth:250
                },
                {
                    title: '操作',
                    slot: 'action',
                    align:'center',
                    minWidth:220
                }
            ],
            tableHeight:0,
            loading:false,
            menuData: [],
            treeData:[],
            selectRow:{},
            showAdd:false,
            actionType:'add',
            rowData:{},
            rowParentId:0,
            parentDept:[],
            dropdown: [],                         //checkbox 的list;
        }
    },
    mounted(){
        this.init(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'deptTable');
        if(removeTableColumns("deptTable") === 0){
            this.titleConfig = this.titleConfig.filter(e => e.key);
        }
    },
    methods:{ 
        async init(query){
            this.loading = true;
            let data = await PA_getDeptData(query);
            let dataList = formatTree(data.data,'deptId');
            if(data.data.length > 0) dataList[0]._showChildren = true; 
            this.menuData = dataList;
            this.loading = false;
        },
        query(){
            this.init(this.menuQuery);
        },
        add(row){
            row = row.deptId ? row : this.selectRow;
            if(row.deptId){
                this.showAdd = true;
                this.actionType = 'add';
                this.rowParentId = row.deptId ? row.deptId : this.selectRow.deptId;
                this.parentDept = [{
                    label:row.deptName,
                    value:row.deptId
                }];
                this.rowData = {
                    deptName:'',
                    email:'', 
                    status:"1",
                    leader:"",
                    orderNum:0,
                    parentId:this.rowParentId,
                    phone:''
                };
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
        },
        edit(row) {
            row = row.deptId ? row : this.selectRow;
            if(row.deptId){
                this.showAdd = true;
                this.actionType = 'edit';
                this.parentDept = [{
                    label:row.deptName,
                    value:row.deptId
                }];
                this.rowData= JSON.parse(JSON.stringify(row));
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            }
            
        },
        deleted(row) {
            let rowData = row.deptId ? row : this.selectRow;
            if(this.selectRow.deptId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${ rowData.deptName}】这部门吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await PA_deleteDept({deptId:this.selectRow.deptId});
                      if(data.code == 0){
                        this.$Message.success('删除成功');
                        this.$nextTick(e => {
                            let data = selectNodeList(this.menuData,rowData.parentId,"deptId");
                            data.children = data.children.filter(e => e.deptId !== rowData.deptId);
                        })
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
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        dropDownList(name){
            if(this.selectRow.deptId){
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
        dictColse(bool){
            this.showAdd = bool;
        },
        changeDate(actionType,rowdata){  //子组件新增修改数据后。不刷界面
            if(actionType == "add"){
                let data = selectNodeList(this.menuData,this.selectRow.deptId,"deptId");
                data.children ? data.children : data.children = [];
                data.children.push(rowdata)
            }
            if(actionType == "edit"){
                let data = selectNodeList(this.menuData,rowdata.deptId,"deptId")
                delete rowdata.children;
                Object.assign(data,rowdata)
            }
            this.$set(this.menuData)
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
        },
    },
    watch:{
        getViewPort:{
            handler (newVal){
                fixedTableHeader(newVal,'deptTable',this)
            },
            deep:true
        },
    }

}