<template>
    <Modal
        v-model="show"
        :title="title"
        width="850px"
        draggable
        scrollable
        :closable="false"
        :mask-closable="false"
        class="modaHeight"
        @on-cancel="cancel" 
        @on-ok="ok">
        <Form ref="roleAddRef" :model="rowData" :label-width="80" class="formItem">
            <FormItem class="itemWidth" label="角色名称" prop="roleName">
                <Input v-model="rowData.roleName" placeholder="请输入角色名称" />
            </FormItem> 
            <FormItem  class="itemWidth"  label="角色编码" prop="roleKey" >
                <Input v-model="rowData.roleKey" placeholder="请输入角色编码" />
            </FormItem>
            <FormItem  class="itemWidth"  label="角色顺序"  prop="roleSort" v-if="actionType !== 'scope'">
                <Input type="number" v-model="rowData.roleSort" placeholder="请输入角色顺序" />
            </FormItem>
            <FormItem  class="itemWidth"  label="状态"  v-if="actionType !== 'scope'">
                <RadioGroup v-model="rowData.status">
                    <Radio label="1"><span>正常</span></Radio>
                    <Radio label="0"><span>禁用</span></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem class="itemRemark" label="权限范围" prop="dataScope" v-if="actionType == 'scope'">
                <Select v-model="rowData.dataScope">
                    <Option value="1">全部数据权限</Option>
                    <Option value="2">自定义数据权限</Option>
                    <Option value="3">本部门数据权限</Option>
                    <Option value="4">本部门及以下数据权限</Option>
                    <Option value="5">仅本人数据权限</Option>
                </Select>
            </FormItem>
            <FormItem label="菜单权限" prop="menuIds" v-show="rowData.dataScope == '2' || actionType != 'scope'" class="treeHeight">
                <!-- <Tree ref="roleTree" :data="menuData"  show-checkbox multiple check-directly @on-check-change="checkChange"></Tree> -->
                <Tree ref="roleTree" :data="menuData"  show-checkbox multiple check-directly ></Tree>
            </FormItem>
            <FormItem class="itemRemark" label="备注" prop="remark" v-if="actionType !== 'scope'">
                <Input type="textarea" :rows="4" v-model="rowData.remark" placeholder="请输入备注信息" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { PA_postRoleEdit, PA_postRoleAdd, PA_getMenuList, PA_postRoleScope, PA_getDeptData, PA_getMenuRoles, PA_getDeptRoles } from '@/api/system/role.js'
import { formatTree, selectNode } from 'common/utils/dataFormat.js'
export default{
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
        },
    },
    data(){
        return{
            menuData:[],
            menuDataBase:[],
            deptData:[]
        }
    },
    methods:{
        async ok(){
            let checkIds = this.$refs.roleTree.getCheckedAndIndeterminateNodes();
            let data;
            if(this.actionType == 'edit'){
                this.rowData.menuIds = checkIds.map(e => e.menuId);
                data = await PA_postRoleEdit(this.rowData);
            }else if(this.actionType == 'add'){
                this.rowData.menuIds = checkIds.map(e => e.menuId);
                data = await PA_postRoleAdd(this.rowData);
            }else if(this.actionType == 'scope'){
                this.rowData.deptIds = checkIds.map(e => e.deptId);
                data = await PA_postRoleScope(this.rowData);
            }
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$plugins.formReset(this,"roleAddRef");
                this.$emit('roleColse',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('roleColse',true);
            }
        },
        cancel(){
            if(this.actionType == 'add') this.$plugins.formReset(this,"roleAddRef")
        },
        async getMenuList(number){
            if(this.actionType !== 'scope'){
                if(!(this.menuDataBase.length > 0)){
                    let data = await PA_getMenuList();
                    this.menuDataBase = formatTree(data.data,"menuId");
                }
                if(this.actionType == 'add'){
                    this.menuData = JSON.parse(JSON.stringify(this.menuDataBase).replace(/menuName/g,'title'));
                    return;
                }
                let newMenuList = JSON.parse(JSON.stringify(this.menuDataBase).replace(/menuName/g,'title'));
                let selected = await PA_getMenuRoles({roleId:this.rowData.roleId});
                this.menuData = selectNode(newMenuList,selected.checkedKeys,"menuId");
            }else{
                if(!(this.deptData.length > 0)){
                    let data = await PA_getDeptData();
                    this.deptData = formatTree(data.data,'deptId');
                }
                let NewDeptList = JSON.parse(JSON.stringify(this.deptData).replace(/deptName/g,'title'));
                NewDeptList[0].expand = true;
                let selected = await PA_getDeptRoles({roleId:this.rowData.roleId});
                this.menuData = selectNode(NewDeptList,selected.checkedKeys,"deptId");
            }
            
        },
        // checkChange(arr){
        //     let ids = []
        //     arr.map(e => {
        //         ids.push(this.actionType == 'scope'? e.deptId : e.menuId);
        //     })
        //     if(this.actionType == 'scope'){
        //         this.rowData.deptIds = ids;
        //     }else{
        //         this.rowData.menuIds = ids;
        //     }
        // },
       
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
            let tit;
            if(this.actionType == 'add'){
                tit = '新增角色';
            }else if(this.actionType == 'edit'){
                tit = '修改角色';
            }else if(this.actionType == 'scope'){
                tit = '分配数据权限';
            }
            return tit;
        },
    },
    watch:{
        "rowData.roleId":{
            handler(newValue){
                this.getMenuList();
            }
        },
        actionType:{
            handler(newValue){
                this.getMenuList();
            }
        }
    }


}
</script>

<style lang="less">
    .modaHeight{
        .ivu-modal-body{
            min-height: 350px;
        }
    }
</style>
