<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view view-flex">
            <div class="ht__query-box">
                <Form :model="menuQuery" :label-width="80" class="form__style">
                    <Row>
                        <Col span="8">
                            <FormItem label="字典编码" class="form_item">
                                <Input v-model="menuQuery.dictCode" placeholder="请输入字典编码" />
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
                <Table class="table-container" border :height="tableHeight" :loading="loading" :columns="titleConfig" :data="tableData">
                    <template slot-scope="{ row, index }" slot="status">
                        <i-switch  v-model="row.status"  @on-change="userStatusChange($event,index)" ></i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="action">
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
import { PFS_getUserList } from '@/api/system/user'
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
                dictCode:'',
                status:'',

            },
            dropdown:false,
            titleConfig:[
                {
                    title: '用户名称',
                    key: 'user_name',
                    align: 'center',
                    minWidth:120,
                },
                {
                    title: '编码',
                    key: 'user_code',
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
            pageTotal:0
        }
    },
    computed:{
        ...mapGetters(["getViewPort"]),
    },
    mounted(){
        this.init();
        this.tableHeight = fixedTableHeader(this.getViewPort,this);
    },
    methods:{
        async init(){
            this.loading = true;
            let data = await PFS_getUserList();
            this.tableData = data.data;
            this.pageTotal = data.total;
            this.loading = false;
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