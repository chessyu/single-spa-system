<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="postForm" :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="所属系统"  class="form_item"  prop="postName">
                        <Input v-model="menuQuery.postName" placeholder="请输入岗位名称" />
                    </FormItem>
                    <FormItem label="业务模块" class="form_item" prop="postCode">
                        <Input v-model="menuQuery.postCode" placeholder="请输入岗位职称" />
                    </FormItem>
                    <FormItem  class="form_item">
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table">
                <div  class="table" id="postTable">
                    <div class="buttonGroup">
                        <Button type="info" @click="edit" v-buttomPower="['ABP:system:post:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['ABP:system:post:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                    </div>
                    <Table :height="tableHeight" row-key="id" :columns="titleConfig" :data="menuData" highlight-row  :loading="loading" @on-current-change="onCurrentChange" >
                        <template slot-scope="{ row }" slot="postSort">
                            <Tag color="cyan">{{row.postSort}}</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="status">
                            <Tag color="success" v-if="row.status == '0'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['ABP:system:post:edit']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom"  @click="deleted(row,index)"  v-buttomPower="['ABP:system:post:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
                <div class="page">
                    <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
                </div>
            </div>
        </div>
        <post-add :showAdd="showAdd" :actionType="actionType" :rowData="rowData"  @dictColse="dictColse" @reload="query"></post-add>
    </div>
</template>

<script src="./structureConfig.js"></script>

<style lang="less" scoped>

</style>