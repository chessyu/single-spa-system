
    <template>
        <div class="ht_content-container animation-left">
            <div class="ht_content-view">
                <div class="ht__query-box">
                    <Form ref="payOrderForm" :model="menuQuery" :label-width="110" class="form__style">
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
                        <FormItem  label="平台OpenId" class="form_item" prop="openId">
                            <Input v-model="menuQuery.openId" placeholder="请输入平台OpenId" />
                        </FormItem>
                        <FormItem  label="渠道OpenId" class="form_item" prop="snOpenId">
                            <Input v-model="menuQuery.snOpenId" placeholder="请输入渠道OpenId" />
                        </FormItem>
                        <FormItem  label="平台订单号" class="form_item" prop="issueOrderNo">
                            <Input v-model="menuQuery.issueOrderNo" placeholder="请输入平台订单号" />
                        </FormItem>
                        <FormItem  label="渠道订单号" class="form_item" prop="snOrderNo">
                            <Input v-model="menuQuery.snOrderNo" placeholder="请输入渠道订单号" />
                        </FormItem>
                        <FormItem  label="游戏订单号" class="form_item" prop="gameOrderNo">
                            <Input v-model="menuQuery.gameOrderNo" placeholder="请输入游戏订单号" />
                        </FormItem>
                        <FormItem  label="支付状态" class="form_item" prop="paymentStatus">
                            <Select v-model="menuQuery.paymentStatus"  placeholder="请选择支付状态" clearable >
                                <Option class="selectLi" v-for="(item,index) in paymentStatus" :key="index" :value="item.dictValue" :label="item.dictLabel">
                                    <span class="selectLabel" :title="item.dictLabel">{{item.dictLabel}}</span>
                                    <span class="selectValue" :title="item.dictValue">{{item.dictValue}}</span>
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="支付时间" class="form_item" prop="paymentTime">
                            <DatePicker  v-model="menuQuery.paymentTime" format="yyyy年MM月dd日"  clearable editable type="daterange" placement="bottom-end" placeholder="请选择支付时间段" style="width: 100%"></DatePicker>
                        </FormItem>
                        <FormItem  label="发货状态" class="form_item" prop="deliveryStatus">
                            <Select v-model="menuQuery.deliveryStatus"  placeholder="请选择发货状态" clearable >
                                <Option class="selectLi" v-for="(item,index) in deliveryStatus" :key="index" :value="item.dictValue" :label="item.dictLabel">
                                    <span class="selectLabel" :title="item.dictLabel">{{item.dictLabel}}</span>
                                    <span class="selectValue" :title="item.dictValue">{{item.dictValue}}</span>
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem  label="发货时间" class="form_item" prop="deliveryTime">
                            <DatePicker  v-model="menuQuery.deliveryTime" format="yyyy年MM月dd日"  clearable editable type="daterange" placement="bottom-end" placeholder="请选择发货时间段" style="width: 100%"></DatePicker>
                        </FormItem>
                        <FormItem  class="form_item">
                            <Button type="primary" icon="ios-search" @click="query">查询</Button>
                            <Button icon="md-sync" @click="reset">重置</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="sys__table">
                <!-- ①id 是唯一的，动态计算表格高度时会用到 ②v-buttomPower 按钮权限[系统简称:模块名:文件名:按钮名称]-->
                    <div  class="table" id="payOrderTable">
                        <div class="buttonGroup">
                            <Button type="success" @click="again" v-buttomPower="['IP:issueSystem:payOrder:again']">
                                <Icon type="md-refresh"></Icon>重新发货
                            </Button>
                            <custom-columns :dropdown="dropdown" :titleConfig="titleConfig" :fieldName="'IP_payOrder_'+userId" @changeDropdown="changeDropdown"></custom-columns>
                        </div>
                        <Table :height="tableHeight" row-key="id" :columns="costemColumns" :data="menuData" highlight-row  :loading="loading" @on-current-change="onCurrentChange" >
                            <template slot-scope="{ row }" slot="paymentStatus">
                                <template v-for="(item,index) in paymentStatus">
                                    <Tag  :key="index" :color="row.paymentStatus == 1 ? 'success' : 'error'" v-show="row.paymentStatus == (item.dictValue).toString()">{{item.dictLabel}}</Tag>
                                </template>
                            </template>
                            <template slot-scope="{ row }" slot="deliveryStatus">
                                <template v-for="(item,index) in deliveryStatus">
                                    <Tag  :key="index" :color="row.paymentStatus == 1 ? 'success' : 'error'" v-show="row.deliveryStatus == (item.dictValue).toString()">{{item.dictLabel}}</Tag>
                                </template>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <span class="tableButtom" @click="again(row,index)"  v-buttomPower="['IP:issueSystem:payOrder:again']"><Icon type="md-refresh" />重新发货</span>
                                <!-- <span class="tableButtom" @click="edit(row,index)"  v-buttomPower="['IP:issueSystem:payOrder:edit']"><Icon type="ios-create-outline" />修改</span>
                                <span class="tableButtom"  @click="deleted(row,index)"  v-buttomPower="['IP:issueSystem:payOrder:remove']"><Icon type="ios-trash-outline" />删除</span> -->
                            </template>
                        </Table>
                    </div>
                    <div class="page">
                        <Page :total="pageTotal" show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"/> 
                    </div>
                </div>
            </div>
            <!-- <payOrderAdd :showModal="showModal" :actionType="actionType" :rowData="rowData"  @modalClose="modalClose" @reload="query"></payOrderAdd> -->
        </div>
    </template>

    <script src="./payOrder.js"></script>
    <style lang="less" scoped>

    </style>
    