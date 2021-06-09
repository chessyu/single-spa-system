
    <template>
        <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="testEnvForm" :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="游戏"  class="form_item"  prop="gameId" >
                        <Select v-model="menuQuery.gameId"  placeholder="请选择游戏" clearable @on-change="gameSelect">
                            <Option class="selectLi" v-for="(item,index) in gameList" :key="index" :value="item.value" :label="item.label">
                                <span class="selectLabel" :title="item.label">{{item.label}}</span>
                                <span class="selectValue" :title="item.value">{{item.value}}</span>
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="专区标识" class="form_item" prop="zoneKey">
                        <Select v-model="menuQuery.zoneKey"  placeholder="请选择专区标识" clearable @on-change="zoneSelect">
                            <Option class="selectLi" v-for="(item,index) in zoneList" :key="index" :value="item.value" :label="item.label">
                                <span class="selectLabel" :title="item.label">{{item.label}}</span>
                                <span class="selectValue" :title="item.value">{{item.value}}</span>
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="渠道" class="form_item" prop="snKey">
                        <Select v-model="menuQuery.snKey"  placeholder="请选择渠道" clearable >
                            <Option class="selectLi" v-for="(item,index) in snList" :key="index" :value="item.value" :label="item.label">
                                <span class="selectLabel" :title="item.label">{{item.label}}</span>
                                <span class="selectValue" :title="item.value">{{item.value}}</span>
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem  class="form_item">
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table">
            <!-- ①id 是唯一的，动态计算表格高度时会用到 ②v-buttomPower 按钮权限[系统简称:模块名:文件名:按钮名称]-->
                <div  class="table" id="testEnvTable">
                    <div class="buttonGroup">
                        <Button type="primary" @click="add" v-buttomPower="['IP:issueSystem:testEnv:add']">
                        <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" @click="edit" v-buttomPower="['IP:issueSystem:testEnv:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['IP:issueSystem:testEnv:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                        <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'IP_testEnv_'+ userId" @changeDropdown="changeDropdown"></custom-columns>
                    </div>
                    <Table :height="tableHeight" row-key="debugSnId" :columns="costemColumns" :data="menuData" highlight-row  :loading="loading" @on-current-change="onCurrentChange" >
                        <template slot-scope="{ row }" slot="postSort">
                            <Tag color="cyan">{{row.postSort}}</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="status">
                            <Tag color="success" v-if="row.status == '0'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['IP:issueSystem:testEnv:edit']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom"  @click="deleted(row,index)"  v-buttomPower="['IP:issueSystem:testEnv:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
                <div class="page">
                     <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/> 
                </div>
            </div>
        </div>
        <testEnvAdd :showModal="showModal" :actionType="actionType" :rowData="rowData" :gameList="gameList"  @modalClose="modalClose" @reload="query"></testEnvAdd>
        </div>
    </template>

    <script src="./testEnv.js"></script>
    <style lang="less" scoped>

    </style>
    