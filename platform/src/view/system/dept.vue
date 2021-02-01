<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="部门名称" class="form_item">
                        <Input v-model="menuQuery.deptName" placeholder="请输入部门名称" />
                    </FormItem>
                    <FormItem label="状态"  class="form_item">
                        <Select v-model="menuQuery.status" clearable>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </FormItem>
                    <FormItem  class="form_item">
                        <Button type="primary" @click="query">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table">
                <div  class="table"  id="deptTable">
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
                        <Button type="primary" @click="add" v-buttomPower="['ABP:system:dept:add']">
                         <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" @click="edit" v-buttomPower="['ABP:system:dept:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['ABP:system:dept:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                        <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'ABP_dept_'+ userId" @changeDropdown="changeDropdown"></custom-columns>
                    </div>
                    <Table :height="tableHeight" row-key="deptId" :loading="loading" :columns="costemColumns" :data="menuData" highlight-row   @on-current-change="onCurrentChange">
                        <template slot-scope="{ row }" slot="leader">
                            <Tooltip max-width="200" :content="`${row.leader}\n${row.phone}\n${row.email}`">
                                <Tag color="cyan">{{row.leader}}</Tag>
                            </Tooltip>
                        </template>
                        <template slot-scope="{ row }" slot="orderNum">
                            <Tag color="cyan">{{row.orderNum}}</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="status">
                            <Tag color="success" v-if="row.status == '1'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <span class="tableButtom" @click="add(row,index)"  v-buttomPower="['ABP:system:dept:add']"><Icon type="md-add" />新增</span>
                            <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['ABP:system:dept:edit']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom" v-if="row.deptId != 100"  @click="deleted(row,index)" v-buttomPower="['ABP:system:dept:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
        <dept-add :showAdd="showAdd" :actionType="actionType" :rowParentId="rowParentId" :rowData="rowData" :parentDept="parentDept"  :deptList="menuData" @dictColse="dictColse" @reload="changeDate" />
    </div> 
</template>

<script src="./dept.js"></script>

<style lang="less" scoped>
    .PA__sys-menu{
        width: 100%;
        height: 100%;
        background: #fff;
    }
</style>