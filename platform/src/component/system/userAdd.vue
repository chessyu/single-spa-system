<template>
    <Modal
        v-model="show"
        :title="title"
        :closable="false"
        :mask-closable="false"
        width="850px"
        draggable
        @on-cancel="cancel"
        @on-ok="ok">
        <Form ref="userAddRef" :model="rowData" :rules="ruleValidate" :label-width="80" class="formItem">
            <FormItem label="姓名" prop="nickName" class="itemWidth">
                <Input v-model="rowData.nickName" @on-blur="onChangePy(rowData.nickName)" placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="部门" prop="deptId"  class="itemWidth">
                <!-- <Cascader trigger="hover" transfer filterable :data="deptData" v-model="rowData.deptId" change-on-select  placeholder="请选择归属部门"></Cascader> -->
                <treeselect
                    v-model="rowData.deptId"
                    :options="deptData"
                    :normalizer="normalizer"
                    :show-count="true"
                    placeholder="请选择部门"
                />
            </FormItem>
            <FormItem label="手机号"  prop="phone"  class="itemWidth">
                <Input  v-model="rowData.phone" placeholder="请输入手机号" />
            </FormItem>
            <FormItem label="邮箱"  prop="email"  class="itemWidth">
                <Input type="email" v-model="rowData.email" placeholder="请输入邮箱" />
            </FormItem>
            <FormItem label="用户账号"  prop="userName" class="itemWidth" v-if="actionType == 'add'">
                <Input v-model="rowData.userName" placeholder="请输入用户账号" />
            </FormItem>
            <FormItem label="用户密码"  prop="password" class="itemWidth" v-if="actionType == 'add'">
                <Input type="password" disabled v-model="rowData.password" placeholder="请输入用户密码" />
            </FormItem>
            <FormItem label="性别"  prop="sex" class="itemWidth">
                <RadioGroup v-model="rowData.sex">
                    <Radio label="1"><span>男</span></Radio>
                    <Radio label="0"><span>女</span></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="状态"  class="itemWidth">
                <RadioGroup v-model="rowData.status">
                    <Radio label="1"><span>正常</span></Radio>
                    <Radio label="0"><span>禁用</span></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="岗位"  prop="postIds" class="itemWidth">
                <Select v-model="rowData.postIds" multiple>
                    <Option v-for="(item,index) in postData" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="角色"  prop="roleIds" class="itemWidth">
                <Select v-model="rowData.roleIds" multiple >
                    <Option v-for="(item,index) in roleData" :key="index" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="备注" prop="remark"  class="itemRemark">
                <Input type="textarea" :rows="4" v-model="rowData.remark" placeholder="请输入备注信息" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import {PA_postUserListAdd, PA_postUserListEdit, PA_getOrganizational,PA_getPostData, PA_getRoleData} from '@/api/system/user.js'
import { formatTree } from 'common/utils/dataFormat.js'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import pinyin from 'pinyin'

export default{
    components:{
        Treeselect
    },
    props:{
        showAdd:{
            type:Boolean,
            required:true
        },
        actionType:{
            type:String,
            required:true
        },
        rowData:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            deptData:[],
            postData:[],
            roleData:[],
            ruleValidate:{
                nickName:[{ required: true, message: '姓名为必填项', trigger: 'blur' }],
                deptId:[{ required: true, type:'number', message: '归属部门为必填项', trigger: 'blur' }],
                postIds:[{ required: true,  type:'array',message: '所属岗位为必填项', trigger: 'blur' }],
                roleIds:[{ required: true,  type:'array',message: '角色为必填项', trigger: 'blur' }],
                email: [
                    { message: '邮箱为必填项', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                phone:[
                    { pattern: /^1[3456789]\d{9}$/, max:11 ,message: "手机号码格式不正确", trigger: "blur" }
                ],
            }
        }
    },
    mounted(){
        this.getDeptList();
        this.getPostData();
        this.getRoleData();
    },
    methods:{
        ok(){
            this.$refs["userAddRef"].validate((valid) => {
                console.log(this.rowData)
                if (valid) {
                    this.postApiData()
                }else{
                    this.$Message.error("必填项未填写内容");
                    setTimeout(() => {
                        this.$emit('roleColse',true);
                    }, 500);
                }
            })
        },
        async postApiData(){
            let params = JSON.parse(JSON.stringify(this.rowData));
            // params.deptId = params.deptId.pop();
            let data = this.actionType == 'edit' ? await PA_postUserListEdit(params) : await PA_postUserListAdd(params);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"userAddRef");
                this.$emit('roleColse',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('roleColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"userAddRef")
        },
        //获取菜单数据
        async getDeptList(){
            let data = await PA_getOrganizational();
            // this.deptData = JSON.parse(JSON.stringify(data.data[0].children).replace(/id/g,"value").replace(/title/g,'label'));
            this.deptData = JSON.parse(JSON.stringify(data.data).replace(/id/g,"value").replace(/title/g,'label'));
        },
        //获取岗位数据
        async getPostData(){  
            let data = await PA_getPostData();
            this.postData = JSON.parse(JSON.stringify(data.data).replace(/postName/g,"label").replace(/postId/g,'value'));
        },
        //中文名转拼音
        onChangePy(event){
            if(this.actionType == 'edit') return;
            let py = pinyin(event,{
                style: pinyin.STYLE_NORMAL, // 设置拼音风格
                heteronym: true
            })
            let userName = py.map((e,i) => {
                if(i > 0){
                    return e[0].substring(1,0);
                }else{
                    return e[0];
                }
            })
            this.rowData.userName = userName.join("");
        },
        //获取角色数据
        async getRoleData(){  
            let data = await PA_getRoleData();
            this.roleData = JSON.parse(JSON.stringify(data.data).replace(/roleName/g,"label").replace(/roleId/g,'value'));
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                    delete node.children;
                }
                return {
                id: node.value,
                label: node.label,
                children: node.children
            };
        },
    },
    computed:{
        show:{
            get(){
                return this.showAdd;
            },
            set(){
                this.$emit('roleColse',false);
            }
        },
        title(){
            if(this.actionType == "add"){
                return "添加用户"
            }else{
                return "修改用户"
            }
        }
    }

}
</script>

<style lang="less" scoped>
.formItem{
    display: flex;
    flex-wrap: wrap;
}
.itemWidth{
    width: 50%;
}
.itemRemark{
    flex: 1;
}
</style>