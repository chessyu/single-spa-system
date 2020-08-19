import { PA_getPostData, PA_postDelete } from '@/api/system/post.js'
import { fixedTableHeader } from '@/utils/help.js'
import { mapGetters } from 'vuex'
import postAdd from '@/component/system/postAdd.vue'
import customColumns from 'public-component-ui/utils/common/customColumns.vue'

export default{
    name:'post',
    components:{
        postAdd,
        customColumns
    },
    data(){
        return{
            data:[],
            pageTotal:0,
            menuQuery:{
                paging:{
                    pageIndex: 1,
                    pageSize: 10
                },
                postCode:'',
                status:'',
                postName:'',
            },
            titleConfig: [
                {
                    title: '岗位名称',
                    key: 'postName',
                    minWidth:120
                },
                {
                    title: '岗位职称',
                    key: 'postCode',
                    minWidth:120
                },
                {
                    title: '顺序',
                    key: 'postSort',
                    slot: 'postSort',
                    minWidth:80
                },
                {
                    title: '状态',
                    key: 'status',
                    slot: 'status',
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
                    minWidth:180
                }
            ],
            tableHeight:0,
            menuData: [],
            loading:false,
            showAdd:false,
            selectRow:{},
            actionType:'add',
            rowData:{},
            dropdown: [],                         //checkbox 的list;

        }
    },
    mounted(){
        this.postOrganizational(this.menuQuery);
        this.tableHeight = fixedTableHeader(this.getViewPort,'postTable')
    },
    methods:{
        //获取组织架构的数据
        async postOrganizational(param){  
            this.loading = true;
            let data = await PA_getPostData(param);
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
            this.$refs['postForm'].resetFields();
        },
        // 新增
        add(){
            this.showAdd = true;
            this.actionType = 'add';
            this.rowData = {
                postName:'',
                postCode:'', 
                postSort:0,
                status:"1",
                remark:""
            };
        },
        // 修改
        edit (row,index) {
            row = row.postId ? row : this.selectRow;
            if(row.postId){
                this.showAdd = true;
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
            let rowData = row.postId ? row : this.selectRow;
            if(this.selectRow.postId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.postName}】这岗位吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await PA_postDelete({postId:rowData.postId});
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
        // 下拉菜单事件时触发
        dropDownList(name){
            if(this.selectRow.postId){
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
        dictColse(bool){
            this.showAdd = bool;
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
                fixedTableHeader(newVal,'postTable',this)
            },
            deep:true
        },
    }
}