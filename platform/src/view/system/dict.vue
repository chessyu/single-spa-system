<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="dictForm" :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="字典名称" class="form_item" prop="dictName">
                        <Input v-model="menuQuery.dictName" placeholder="请输入字典名称" />
                    </FormItem>
                    <FormItem label="状态"  class="form_item" prop="status">
                        <Select v-model="menuQuery.status" clearable>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="字典类型"  class="form_item"  prop="dictType">
                        <Input v-model="menuQuery.dictType" placeholder="请输入字典类型" />
                    </FormItem>
                    <FormItem label="创建日期"  class="form_item"  prop="created">
                        <DatePicker  v-model="menuQuery.created" placement="bottom" type="daterange" format="yyyy-MM-dd" style="width:100%;" placeholder="请选择创建时间段"  @on-change="dataPickerOk"></DatePicker>
                    </FormItem>
                    <FormItem  class="form_item">
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table">
                <div  class="table" id="dictTable">
                    <!-- <ButtonGroup class="buttonGroup">
                        <Button type="primary" size="small" @click="add">
                            <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" size="small" @click="edit">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button  size="small">
                            <Dropdown  @on-click="dropDownList">
                                更多
                                <Icon type="ios-more"></Icon>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="deleted"><Icon type="ios-trash-outline moer_icon" />删除</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Button>
                    </ButtonGroup> -->
                    <div class="buttonGroup">
                        <Button type="primary" @click="add" v-buttomPower="['ABP:system:dict:add']">
                         <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" @click="edit" v-buttomPower="['ABP:system:dict:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['ABP:system:dict:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                        <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'ABP_dict_'+ userId" @changeDropdown="changeDropdown"></custom-columns>
                    </div>
                    <Table :height="tableHeight" row-key="id" :columns="costemColumns" :data="menuData" highlight-row  :loading="loading" @on-current-change="onCurrentChange" >
                        <template slot-scope="{ row }" slot="dictName">
                            <span class="tableButtom" @click="openType(row)"  >{{row.dictName}}</span>
                        </template>
                        
                        <template slot-scope="{ row }" slot="status">
                            <Tag color="success" v-if="row.status == '1'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag>
                        </template>
                        
                        <template slot-scope="{ row, index }" slot="action">
                            <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['ABP:system:dict:add']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom"  @click="deleted(row,index)"  v-buttomPower="['ABP:system:dict:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
                <div class="page">
                    <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
                </div>
            </div>
        </div>
        <dict-add :showAdd="showAdd" :actionType="actionType" :rowData="rowData"  @dictColse="dictColse" @reload="query"></dict-add>
    </div>
</template>

<script src="./dict.js"></script>

<style lang="less" scoped>
    .sys_dict{
        height: 100%;
        padding: 10px;
        background: #fff;
    }
</style>