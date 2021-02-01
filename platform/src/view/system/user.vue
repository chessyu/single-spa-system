<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view view-flex">
            <!-- <Split v-model="split" min="200px"  style="height:100%;"> -->
                <div slot="left"  class="box_left">
                    <!-- <Input prefix="ios-search" v-model="queryDep" placeholder="输入关键字"/> -->
                    <Tree :data="data" @on-select-change="onTreeSelect"></Tree>
                </div>
                <div slot="right" class="box_right">
                    <div class="ht__query-box">
                        <Form ref="userForm" :model="menuQuery" :label-width="80" class="form__style">
                            <FormItem label="姓名" class="form_item" prop="nickName">
                                <Input v-model="menuQuery.nickName" placeholder="请输入姓名" />
                            </FormItem>
                            <FormItem label="用户账号" class="form_item" prop="userName">
                                <Input v-model="menuQuery.userName" placeholder="请输入用户账号" />
                            </FormItem>
                            <FormItem label="状态"  class="form_item"  prop="status">
                                <Select v-model="menuQuery.status" clearable>
                                    <Option value="1">正常</Option>
                                    <Option value="0">禁用</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="创建日期"  class="form_item"  prop="created">
                                <DatePicker  v-model="menuQuery.created" type="datetimerange" format="yyyy-MM-dd" style="width:100%;" placeholder="请选择创建时间段" confirm @on-change="dataPickerOk" @on-clear="timeClear"></DatePicker>
                            </FormItem>
                            <FormItem  class="form_item">
                                <Button type="primary" icon="ios-search" @click="query">查询</Button>
                                <Button icon="md-sync" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="sys__table">
                        <div  class="table" id="userTable">
                            <div class="buttonGroup">
                                <Button type="primary" @click="add" v-buttomPower="['ABP:system:user:add']">
                                <Icon type="md-add"></Icon>新增
                                </Button>
                                <Button type="info" @click="edit" v-buttomPower="['ABP:system:user:edit']">
                                    <Icon type="ios-create-outline"></Icon>修改
                                </Button>
                                <Button type="error" @click="deleted" v-buttomPower="['ABP:system:user:remove']">
                                    <Icon type="md-trash"></Icon>删除
                                </Button>
                                <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'ABP_user_'+userId" @changeDropdown="changeDropdown"></custom-columns>
                            </div>
                            <Table  :height="tableHeight" :loading="loading" :columns="costemColumns" :data="menuData" highlight-row  @on-current-change="onCurrentChange" @on-select="onSelect">
                                <!-- <template slot-scope="{ row }" slot="deptName">
                                    <Tooltip max-width="250" :content="`负责人:${row.dept.leader}\n电话:${row.dept.phone}\n邮箱:${row.dept.email}`">
                                        <Tag color="cyan">{{row.dept.deptName}}</Tag>
                                    </Tooltip>
                                </template> -->
                                <template slot-scope="{ row }" slot="sex">
                                    <Tag color="primary" v-if="row.sex == '1'">男</Tag>
                                    <Tag color="magenta" v-else>女</Tag>
                                </template>
                                <template slot-scope="{ row }" slot="status">
                                    <Tag color="success" v-if="row.status == '1'">正常</Tag>
                                    <Tag color="error" v-else>禁用</Tag>
                                </template>
                                <template slot-scope="{ row }" slot="action">
                                    <span class="tableButtom"  @click="edit(row)"  v-buttomPower="['ABP:system:user:edit']"><Icon type="ios-create-outline" />修改</span>
                                    <span class="tableButtom" v-if="row.userId !== 1"  @click="deleted(row)"  v-buttomPower="['ABP:system:user:reomve']"><Icon type="ios-trash-outline" />删除</span>
                                    <span class="tableButtom" v-if="row.userId !== 1"  @click="passwordReset(row)"  v-buttomPower="['ABP:system:user:reset']"><Icon type="md-sync" />重置</span>
                                </template>
                            </Table>
                        </div>
                        <div class="page">
                            <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" />
                        </div>
                    </div>
                </div>
            <!-- </Split> -->
           
        </div>
        <user-add :showAdd="showAdd" :actionType="actionType" :rowData="rowData" @roleColse="roleColse"  @reload="query"/>
    </div>
</template>

<script src="./user.js"></script>

<style lang="less" scoped>
    .sys_user{
        height: 100%;
        padding: 10px;
        background: #fff;
    }
    .box_right{
        background: #fff;
    }
</style>