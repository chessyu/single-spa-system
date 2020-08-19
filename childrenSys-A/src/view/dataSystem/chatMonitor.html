
<template>
    <div class="ht_content-container animation-left chat-monitor">
        <div class="ht_content-view">
            <div class="ht__query-box">
                <Form ref="chatMonitorForm" :model="menuQuery" :rules="ruleValidate" :label-width="80" class="form__style">
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
                     <FormItem label="区服" class="form_item" prop="areaId">
                          <Select v-model="menuQuery.areaId"  placeholder="请输入区服" clearable >
                            <Option class="selectLi" v-for="(item,index) in areaList" :key="index" :value="item.value" :label="item.label">
                                <span class="selectLabel" :title="item.label">{{item.label}}</span>
                                <span class="selectValue" :title="item.value">{{item.value}}</span>
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="角色Id" class="form_item" prop="roleId">
                        <Input v-model="menuQuery.roleId" placeholder="请输入角色Id" />
                    </FormItem>
                    <FormItem label="角色名称" class="form_item" prop="roleName">
                        <Input v-model="menuQuery.roleName" placeholder="请输入角色名称" />
                    </FormItem>
                    <FormItem label="聊天频道" class="form_item" prop="chatType">
                        <Select v-model="menuQuery.chatType"  placeholder="请选择聊天频道" clearable >
                            <Option class="selectLi" v-for="(item,index) in chatTypeList" :key="index" :value="item.value" :label="item.label">
                                <span class="selectLabel" :title="item.label">{{item.label}}</span>
                                <span class="selectValue" :title="item.value">{{item.value}}</span>
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem  label="开始时间" class="form_item" prop="chatTime">
                        <DatePicker  v-model="menuQuery.chatTime"  clearable editable type="datetime" placement="bottom-end" placeholder="请选择日期时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem  class="itemWidth">
                        <Button type="primary" icon="ios-search" @click="query">查询</Button>
                        <Button icon="md-sync" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="sys__table" id="sys__table">
                <ul class="chartUl" id="chartUl">
                    <li v-for="(item,index) in chartList" :key="index" @click="chartSelect(item,$event)"> 
                        <span>[<i>{{item.chatTime}}</i>]</span> 
                        <span >[<i class="area">{{item.chatTypeZH}}</i>]</span> 
                        <span>[<i class="chatid">{{item.areaId}}</i>]</span> 
                        <span> <i class="rolename">{{item.roleName}}</i>：</span> 
                        <span><i>{{item.chatContent}}</i></span>
                    </li>
                </ul>
            </div>
        </div>
    
    </div>
</template>

<script src="./chatMonitor.js"></script>

<style lang="less">
.chat-monitor{
    .sys__table{
        height: calc(100% - 185px);
        background: #f5f7f9;
        border-radius: 10px;
        overflow: hidden;
        overflow-y: auto;
        .chartUl{
            padding: 20px 10px;
            color: #545454;
            font-size: 15px;
            li{
                padding: 0 5px;
                cursor: pointer;
                span > i{
                    display: inline-block;
                    text-align: center;
                }
                .area{
                    min-width:40px;
                }
                .chatid{
                    min-width: 44px;
                }
                .rolename{
                    text-align: left;
                    // min-width: 100px;
                }
            }
            li:hover{
                background: #ffe1ce;
                transition: all .5s;
            }
            .actionLi{
                background: #ffe1ce;
                transition: all .5s;
            }
        }
    }
    .ivu-form-item-error-tip{
        padding-top: 0 !important;
    }
}
</style>
    