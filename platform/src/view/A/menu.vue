<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view view-flex">
            <div class="ht__query-box">
                <Form :model="menuQuery" :label-width="80" class="form__style">
                    <Row>
                        <Col span="8">
                            <FormItem label="菜单名称" class="form_item">
                                <Input v-model="menuQuery.deptName" placeholder="请输入角色名称" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="状态"  class="form_item">
                                <Select v-model="menuQuery.status" clearable>
                                    <Option value="1">正常</Option>
                                    <Option value="0">禁用</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="所属系统"  class="form_item">
                                <Select v-model="menuQuery.systemCode" clearable>
                                    <Option :value="item.system_code" v-for="item in sysList" :key="item.system_code">{{item.system_name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem  class="form_item">
                                <Button type="primary" @click="query">查询</Button>
                                 <Button  @click="reset">重置</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div class="sys__table" ref="sys__table">
                <div class="buttonGroup" >
                    <Button type="primary" @click="add" v-buttomPower="['ABP:system:dept:add']">
                        <Icon type="md-add"></Icon>新增
                    </Button>
                </div>
                <Table row-key="menu_id" class="table-container"  :height="tableHeight" :loading="loading" :columns="titleConfig" :data="tableData">
                    <template slot-scope="{ row, index }" slot="status">
                        <i-switch  v-model="row.status"  @on-change="userStatusChange($event,index)" ></i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="action" >
                        <span class="table-button edit" @click="edit(row)">修改</span>
                        <span class="table-button deleted" @click="deleted(row)">删除</span>
                    </template>
                </Table>
                <div class="page">
                    <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PFS_getMenuList,PFS_getSystemList } from '@/api/system/menu'
import { fixedTableHeader } from '../../../../commonModules/utils/help.js'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            menuQuery:{
                paging:{
                    pageIndex: 1,
                    pageSize: 10
                },
                deptName:'',
                status:'',
                systemCode:''

            },
            dropdown:false,
            titleConfig:[
                {
                    title: '菜单名称',
                    key: 'title',
                    align: 'center',
                    minWidth:120,
                    tree: true
                },
                {
                    title: '编码',
                    key: 'menu_code',
                    align: 'center',
                    minWidth:120,
                },
                {
                    title: '图标',
                    key: 'icon',
                    align: 'center',
                    minWidth:120,
                },
                {
                    title: '路径',
                    key: 'path',
                    align: 'center',
                    minWidth:120,
                },
                {
                    title: '路由名称',
                    key: 'component',
                    align: 'center',
                    minWidth:120,
                },
                 {
                    title: '所属系统',
                    key: 'formSys',
                    align: 'center',
                    minWidth:120,
                },
                {
                    title: '是否有效',
                    key: 'status',
                    align: 'center',
                    minWidth:120,
                    slot: 'status',
                },

                {
                    title: '创建人',
                    key: 'create_user',
                    align: 'center',
                    minWidth:120,
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    align: 'center',
                    minWidth:120,
                },
                 {
                    title: '操作',
                    key: '',
                    align:'center',
                    slot:'action',
                    minWidth:120,
                },
            ],
            tableData:[],
            loading:false,
            tableHeight:0,
            pageTotal:0,
            sysList:[]
        }
    },
    computed:{
        ...mapGetters(["getViewPort"]),
    },
    mounted(){
        this.init();
        this.getSystemList();
        this.tableHeight = fixedTableHeader(this.getViewPort,this);
    },
    methods:{
        async init(){
            this.loading = true;
            let data = await PFS_getMenuList();
            this.tableData = data.data;
            this.pageTotal = data.total;
            this.loading = false;
            console.log(this.tableData)
        },
        async getSystemList(){
            let data = await PFS_getSystemList();
            this.sysList = data.data;
            
        },
        query(){
            this.add();
        },
        reset(){
            this.add();
        },
        add(){
            this.$Message.info({
                content:'预览模式不可操作',
                duration:3
            })
        },
        edit(row){
            this.add();
        },
        deleted(row){
            this.add();
        },
        userStatusChange(value,index){
            this.add();
        },
        pageChange(page){
            this.add();
            return
            this.menuQuery.paging.pageIndex = page;
            this.init(this.menuQuery)
        },
        pageSizeChange(pageSize){
            this.add();
            return;
            this.menuQuery.paging.pageSize = pageSize;
            this.init(this.menuQuery)
        },
    },
    watch:{
        getViewPort:{
            handler (newVal){
                fixedTableHeader(newVal,this)
            },
            deep:true
        },
    }
}
</script>

<style lang="less" scoped>

</style>