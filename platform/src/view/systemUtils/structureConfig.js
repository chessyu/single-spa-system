import { PA_getPostData, PA_postDelete } from '@/api/system/post.js'
import { fixedTableHeader } from '@/utils/help.js'
import { mapGetters } from 'vuex'
import postAdd from '@/component/system/postAdd.vue'

export default{
    components:{
        postAdd
    },
    data(){
        return{
            data:[],
            pageTotal:0,
            menuQuery:{
                pageNum: 1,
                pageSize: 10,
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
            rowData:{}

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
            this.menuData = data.rows;
            this.pageTotal = data.total;
            setTimeout(e=>{this.loading = false;},800)
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
            this.rowData = {};
        },
        // 修改
        edit (row,index) {
            row = row.postId ? row : this.selectRow;
            if(row.postId){
                this.showAdd = true;
                this.actionType = 'edit';
                this.rowData= row;
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
                    content:`确定要删除【${rowData.postName}】这岗位吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                      let data = await PA_postDelete(rowData.postId);
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
            }else{
                this.$Message.error({
                    content:'请先选择一条数据再进行操作',
                    duration:3
                })
            } 
        },
        // 切换页码变化时触发
        pageChange(page){
            this.menuQuery.pageNum = page;
            this.postOrganizational(this.menuQuery)
        },
        // 改变当前页条数时触发
        pageSizeChange(pageSize){
            this.menuQuery.pageSize = pageSize;
            this.postOrganizational(this.menuQuery)
        },
        // 关闭新增弹出层的回调
        dictColse(){
            this.showAdd = false;
        },
        // 点击行触发，返回行数据
        onCurrentChange(currentRow){
            this.selectRow = currentRow;
        },
        
    },
    computed:{
        ...mapGetters(["getViewPort"]),
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