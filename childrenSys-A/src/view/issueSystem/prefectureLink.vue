
    <template>
        <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="prefectureLinkForm" :model="menuQuery" :label-width="80" class="form__style">
                    <FormItem label="游戏"  class="form_item"  prop="gameId">
                        <Select v-model="menuQuery.gameId"  placeholder="请选择游戏" clearable>
                            <Option  v-for="(item,index) in gameList" :key="index" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="专区标识" class="form_item" prop="zoneKey">
                        <Input v-model="menuQuery.zoneKey" placeholder="请输入专区标识" />
                    </FormItem>
                    <FormItem label="专区描述"  class="form_item" prop="zoneDepict">
                        <Input v-model="menuQuery.zoneDepict" placeholder="请输入专区描述" />
                    </FormItem>
                    <FormItem  class="form_item">
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table">
            <!-- ①id 是唯一的，动态计算表格高度时会用到 ②v-buttomPower 按钮权限[系统简称:模块名:文件名:按钮名称]-->
                <div  class="table" id="prefectureLinkTable">
                    <div class="buttonGroup">
                        <Button type="primary" @click="add" v-buttomPower="['IP:issueSystem:prefectureLink:add']">
                        <Icon type="md-add"></Icon>新增
                        </Button>
                        <Button type="info" @click="edit" v-buttomPower="['IP:issueSystem:prefectureLink:edit']">
                            <Icon type="ios-create-outline"></Icon>修改
                        </Button>
                        <Button type="error" @click="deleted" v-buttomPower="['IP:issueSystem:prefectureLink:remove']">
                            <Icon type="md-trash"></Icon>删除
                        </Button>
                        <Button type="success" @click="power" v-buttomPower="['IP:issueSystem:gameSys:power']">
                            <Icon type="md-done-all"></Icon>权限
                        </Button>
                        <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'IP_prefectureLink_'+userId" @changeDropdown="changeDropdown"></custom-columns>
                    </div>
                    <Table :height="tableHeight" row-key="id" :columns="costemColumns" :data="menuData" highlight-row  :loading="loading" @on-current-change="onCurrentChange" >
                        <template slot-scope="{ row }" slot="postSort">
                            <Tag color="cyan">{{row.postSort}}</Tag>
                        </template>
                        <template slot-scope="{ row }" slot="status">
                            <Tag color="success" v-if="row.status == '0'">正常</Tag>
                            <Tag color="error" v-else>禁用</Tag> 
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <span class="tableButtom" @click="power(row,index)"  v-buttomPower="['IP:issueSystem:gameSys:power']"><Icon type="md-done-all" />权限</span>
                            <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['IP:issueSystem:prefectureLink:edit']"><Icon type="ios-create-outline" />修改</span>
                            <span class="tableButtom"  @click="deleted(row,index)"  v-buttomPower="['IP:issueSystem:prefectureLink:remove']"><Icon type="ios-trash-outline" />删除</span>
                        </template>
                    </Table>
                </div>
                <div class="page">
                     <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/> 
                </div>
            </div>
        </div>
        <prefectureLinkAdd :showModal="showModal" :actionType="actionType" :rowData="rowData" :gameList="gameList"  @modalClose="modalClose" @reload="query"></prefectureLinkAdd>
        <prefecture-link-pwoer :pwoerShow="pwoerShow"  :rowData="rowData" @pwoerClose="pwoerClose" @reload="query"></prefecture-link-pwoer>
        </div>
    </template>

    <script src="./prefectureLink.js"></script>

    <style lang="less" scoped>
        
    </style>
    