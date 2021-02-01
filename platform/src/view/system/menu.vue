<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="menuForm" :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="菜单名称" class="form_item" prop="menuName">
                        <Input v-model="menuQuery.menuName" placeholder="请输入菜单名称" />
                    </FormItem>
                    <FormItem label="状态"  class="form_item"  prop="status">
                        <Select v-model="menuQuery.status" clearable>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="系统名"  class="form_item"  prop="system">
                        <Select v-model="menuQuery.system">
                            <Option v-for="(item,index) in system" :key="index" :value="item.value">{{item.text}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem  class="form_item">
                        <Button type="primary" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table" >
                <div  class="table" id="menuTable">
                    <!-- <ButtonGroup class="buttonGroup">
                        <Button type="primary" size="small" @click="add" v-buttomPower="['ABP:system:menu:add']">
                            <Icon type="md-add"></Icon>新增
                        </Button>
                         <Button type="info" size="small" @click="edit">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button  size="small">
                            <Dropdown  @on-click="dropDownList">
                                更多
                                <Icon type="ios-more"></Icon>
                                <DropdownMenu slot="list" >
                                    <DropdownItem name="deleted"  v-buttomPower="['ABP:system:menu:remove']"><Icon type="ios-trash-outline moer_icon" />删除</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Button>
                    </ButtonGroup> -->
                    <div class="buttonGroup">
                        <Button type="primary" @click="add" v-buttomPower="['ABP:system:menu:add']">
                         <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" @click="edit" v-buttomPower="['ABP:system:menu:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['ABP:system:menu:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                        <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'ABP_menu_'+ userId" @changeDropdown="changeDropdown"></custom-columns>
                    </div>
                    <Table :height="tableHeight" row-key="menuId" :loading="loading" :columns="costemColumns" :data="menuData" highlight-row  @on-current-change="onCurrentChange">
                        <template slot-scope="{ row }" slot="menuType">
                            <Tag color="warning" v-if="row.menuType == 'M'">目录</Tag>
                            <Tag color="success" v-else-if="row.menuType == 'C'">菜单</Tag>
                            <Tag color="primary" v-else-if="row.menuType == 'F'">按钮</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="icon">
                            <Icon :type="row.icon" />
                        </template>
                        <template slot-scope="{ row }" slot="orderNum">
                            <Tag color="cyan">{{row.orderNum}}</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="visible">
                            <Tag color="success" v-if="row.visible == '1'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="action" >
                            <span class="tableButtom" @click="add(row)" v-buttomPower="['ABP:system:menu:add']"><Icon type="md-add" />新增</span>
                            <span class="tableButtom" @click="edit(row)" v-buttomPower="['ABP:system:menu:edit']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom"  @click="deleted(row)"  v-buttomPower="['ABP:system:menu:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
        <menu-add  :showAdd="showAdd" :actionType="actionType" :rowData="rowData" :menuList="menuList"  @dictColse="dictColse"  @reload="changeDate" />
    </div>
</template>

<script src="./menu.js"></script>

<style lang="less" scoped>
   
</style>