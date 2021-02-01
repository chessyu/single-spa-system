<template>
    <div class="userCenter">
        <Row :gutter="16">
            <i-col :xs="24" :sm="24" :md="12" :lg="8" >
                 <Card bordered class="userData">
                    <p slot="title">个人信息</p>
                    <div  class="userHeader">
                        <img src="@/assets/img/header.gif" alt="">
                        <!-- <Upload
                            :on-error="loaderError"
                            :on-success="loaderSuccess"
                            :on-format-error="formatError"
                            :format="['jpg','jpeg','png']"
                            :action="upLoadUrl">
                            <p class="button"><Icon class="uploadIcon" type="ios-camera-outline" />上传头像</p>
                        </Upload> -->
                        
                    </div>
                    <ul class="user-ul">
                        <li>
                            <Icon type="md-person" class="icon"></Icon>
                            <span class="name">用户名</span>
                            <span class="code">{{getUserData.userName}}</span>
                        </li>
                        <li>
                            <Icon type="ios-phone-portrait" class="icon"></Icon>
                            <span class="name">手机号</span>
                            <span class="code">{{getUserData.phone}}</span>
                        </li>
                        <li>
                            <Icon  class="icon" type="ios-mail-outline" />
                            <span class="name">用户邮箱</span>
                            <span class="code">{{getUserData.email}}</span>
                        </li>
                        <li>
                            <Icon  class="icon" type="md-git-merge" />
                            <span class="name">所属部门</span>
                            <span class="code">{{getUserData.dept.deptName}}</span>
                        </li>
                        <!--<li>
                            <Icon class="icon" type="md-people" />
                            <span class="name">归属角色</span>
                            <span  class="code">
                                <Tag  color="success" v-for="(item,index) in userRole" :key="index">{{item}}</Tag>
                            </span>
                        </li>
                         <li>
                            <Icon class="icon" type="md-calendar" />
                            <span class="name">创建日期</span>
                            <span class="code">{{getUserData.createTime.split(' ')[0]}}</span>
                        </li> -->
                    </ul>
                </Card>
            </i-col>
            <i-col :xs="24" :sm="24" :md="12" :lg="16">
                <Card bordered>
                    <p slot="title">基本资料</p>
                    <Tabs value="name1">
                        <TabPane label="基本资料" name="name1">
                            <Form class="form" ref="userForm" :model="userForm" :rules="userFormRuleInline"  :label-width="80">
                                <FormItem label="姓名" prop="nickName">
                                    <Input prefix="md-person" v-model="userForm.userName"  placeholder="输入姓名"/>
                                </FormItem>
                                <FormItem label="手机号" prop="phone">
                                    <Input prefix="ios-phone-portrait"  v-model="userForm.phone"  placeholder="输入手机号"/>
                                </FormItem>
                                <FormItem label="邮箱" prop="email">
                                    <Input prefix="md-mail"  v-model="userForm.email"  placeholder="输入邮箱"/>
                                </FormItem>
                                <FormItem label="姓别" prop="sex">
                                    <RadioGroup v-model="userForm.sex">
                                        <Radio label="1"><span>男</span></Radio>
                                        <Radio label="0"><span>女</span></Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem>
                                    <div class="login-bottom" @click="userFormUpdate">
                                        <span>立即修改</span>
                                    </div>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="更改密码" name="name2">
                            <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline"  :label-width="80">
                                <FormItem label="旧密码" prop="oldPassword">
                                    <Input prefix="ios-key" password v-model="formInline.oldPassword"  placeholder="原密码"/>
                                </FormItem>
                                <FormItem label="新密码" prop="newPassword">
                                    <Input prefix="md-lock" type="password" password v-model="formInline.newPassword"  placeholder="新密码"/>
                                </FormItem>
                                <FormItem label="确定密码" prop="okPassword">
                                    <Input prefix="md-lock" password type="password"  v-model="formInline.okPassword"  placeholder="确认密码"/>
                                </FormItem>
                                <FormItem>
                                    <div class="login-bottom" @click="pwdUpdate">
                                        <span>立即修改</span>
                                    </div>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Card>
            </i-col>
        </Row>

       
        
    </div>
</template>

<script src="./userCenter.js"></script>

<style lang="less" >
.userCenter{
    width: 100%;
    height: 100%;
    padding: 20px 0 !important;
    background: #fff;
    overflow-y: auto;
    .ivu-row{
        margin: 0px !important; 
    }
    .userData{
        margin: auto;
        padding-left: 15px;
        .userHeader{
            text-align: center;
            img{
                border-radius: 50%;
                width: 110px;
            }
            .button{
                cursor: pointer;
            }
            .uploadIcon{
                font-size: 25px;
                vertical-align: bottom;
            }
        }
        .user-ul{
            list-style-type: none;
            li{
                padding: 35px 0 0 0;
                border-bottom: 1px solid #dcdee2;
                overflow: hidden;
                .icon{
                    font-size: 20px;
                    float: left;
                    color: black;
                }
                .name{
                    float: left;
                    margin-left: 5px;   
                }
                .code{
                    float: right;
                    color: black;

                }
            }
        }
    }
    .login-bottom{
        background: linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff);
        color: #fff;
        text-align: center;
        cursor: pointer;
        position: relative;
        border-radius: 5px;
    }
}


</style>