<template>
    <Modal
        v-model="show"
        title="权限配置"
        width="850px"
        draggable
        :closable="false"
        @on-ok="ok">
        <Form ref="gameSysPwoerRef" :model="rowData" :label-width="80">
            <!-- <FormItem label="角色名称" prop="roleName">
                <Input v-model="rowData.roleName" placeholder="请输入角色名称" />
            </FormItem> -->
            <FormItem label="部门权限" prop="deptIds" >
                <Tree ref="treeRef"  class="treeHeight" :data="deptDataBase" show-checkbox multiple check-directly ></Tree>
            </FormItem>
            
        </Form>
    </Modal>
</template>

<script>
import { PA_getDeptData } from '@/api/common.js'
import { IP_GetGameDept, IP_InsertDeptGame } from '@/api/issueSystem/gameSys.js'
import { formatTree, selectNode } from 'public-component-ui/utils/dataFormat.js'
export default{
    data(){
        return{
            deptData:[],
            deptDataBase:[],
        }
    },
    props:{
        pwoerShow:{
            type:Boolean,
            required:true
        },
        rowData:{
            type:Object,
            default:{}
        },
    },
    methods:{
        async ok(){
            let checkIds = this.$refs.treeRef.getCheckedAndIndeterminateNodes();
            let params = {
                gameId:this.rowData.gameId,
                deptIds:checkIds.map(e => e.deptId).join(','),
            };
            let data =  await IP_InsertDeptGame(params);
            if(data.code == 0){
                this.$Message.success(data.msg);
                this.$emit('pwoerClose',false);
                this.$emit("reload")
            }else{
                this.$Message.error(data.msg || '服务端报错');
                this.$emit('pwoerClose',true);
            }
        },
        async getDeptList(){
            if(!(this.deptData.length > 0)){
                let data = await PA_getDeptData();
                this.deptData = formatTree(data.data,'deptId');
            }
            let NewDeptList = JSON.parse(JSON.stringify(this.deptData).replace(/deptName/g,'title'));
            NewDeptList[0].expand = true;
            let selected = await IP_GetGameDept({gameId: this.rowData.gameId});
            let array;
            if(selected.data){
                array = selected.data.split(',');
            }else{
                array = []
            }
            this.deptDataBase = selectNode(NewDeptList,array,"deptId");
        },
    },
    computed:{
        show:{
            get(){
                if(this.pwoerShow) this.getDeptList();
                return this.pwoerShow;
            },
            set(){
                this.$emit('pwoerClose',false)
            }
        },
    }

}
</script>

<style lang="less" scoped>

</style>