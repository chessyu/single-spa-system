import { PA_getDictData, PA_postDictDelete } from '@/api/system/dict.js'
import { fixedTableHeader } from '@/utils/help.js'
import { mapGetters } from 'vuex'
import dictAdd from '@/component/system/dictAdd.vue'
import customColumns from 'public-component-ui/utils/common/customColumns.vue'

export default{
    name:'dict',
    components:{
        dictAdd,
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
                dictName:'',
                status:'',
                dictType:'',
                beginTime:'',
                endTime:'',
                created:''
            },
            titleConfig: [
                {
                    title: '字典编号',
                    key: 'dictId',
                    minWidth:120
                },
                {
                    title: '字典名称',
                    key: 'dictName',
                    minWidth:120,
                    slot:'dictName'
                },
                {
                    title: '字典类型',
                    key: 'dictType',
                    minWidth:180,
                },
                {
                    title: '状态',
                    key: 'status',
                    slot: 'status',
                    minWidth:100
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    minWidth:250
                },
                {
                    title: '备注',
                    key: 'remark',
                    minWidth:120
                },
                {
                    title: '操作',
                    slot: 'action',
                    align:'center',
                    minWidth:150
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
        this.tableHeight = fixedTableHeader(this.getViewPort,'dictTable')
    },
    methods:{
        //获取组织架构的数据
        async postOrganizational(param){  
            this.loading = true;
            let data = await PA_getDictData(param);
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
            this.$refs['dictForm'].resetFields();
        },
        // 新增
        add(){
            this.showAdd = true;
            this.actionType = 'add';
            this.rowData = {
                dictName:'',
                dictType:'', 
                status:"1",
                remark:""
            };
        },
        // 修改
        edit (row,index) {
            row = row.dictId ? row : this.selectRow;
            if(row.dictId){
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
            let rowData = row.dictId ? row : this.selectRow;
            if(rowData.dictId){
                this.$Modal.confirm({
                    title:'系统提示',
                    content:`确定要删除【${rowData.dictName}】这项数据吗?`,
                    okText: '确定删除',
                    cancelText:'取消',
                    closable:true,
                    onOk:async () => {
                    let data = await PA_postDictDelete({dictId:rowData.dictId});
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
            if(this.selectRow.dictId){
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
        //查看当前类型的所有明细
        openType(row){
            this.$parent.$parent.$parent.$parent.openMenuItem("dictData",1,"字典数据")
            this.$router.push({"name":'dictData',params:{dictType:row.dictType}})
        },
        //动态勾选table列时 重新赋值
        changeDropdown(value){
            this.dropdown = value;
        },
       
    },
    computed:{
        ...mapGetters(["getViewPort","getLayoutTag",'getUserData']),
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
                fixedTableHeader(newVal,'dictTable',this)
            },
            deep:true
        },
    }
}