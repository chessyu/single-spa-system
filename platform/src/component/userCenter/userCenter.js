import {mapGetters,mapActions} from 'vuex'
import {PA_getDeptData, PA_updateUserData, PA_updatePwd} from "@/api/userCenter.js"
import { formatTree, childrenFindFatherTree } from '@/utils/dataFormat.js'


export default{
    name:'userCenter',
    data(){
        return {
            upLoadUrl:'',
            formInline:{
                oldPassword:'',
                newPassword:'',
                okPassword:''
            },
            ruleInline:{
                oldPassword:[{ required: true, message: '旧密码为必填项', trigger: 'blur' }],
                newPassword:[
                    {
                        required:true,
                        validator: this.passwd,
                        trigger:'blur'
                    }
                ],
                okPassword:[
                    {
                        required:true,
                        validator: this.passwdRepeat,
                        trigger:'blur'
                    }
                ]
            },
            userFormRuleInline:{
                nickName:[
                    { required: true, message: '姓名为必填项', trigger: 'blur' }
                ],
                phone:[
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    { pattern: /^1[3456789]\d{9}$/, max:11 ,message: "手机号码格式不正确", trigger: "blur" }
                ],
                email: [
                    { required: true, message: '邮箱为必填项', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
            },
            // userDept:''
        }
    },
    mounted(){
        // this.getDeptData();
        console.log(this.getUserData)
        this.$refs.formInline.resetFields();
    },
    methods:{
        pwdUpdate(){   //密码修改
            this.$refs.formInline.validate(vail => {
                if(vail){
                    this.updatePwd();
                }
            })
        },
        userFormUpdate(){   //个人资料修改
            this.$refs.userForm.validate(vail => {
                if(vail){
                    this.updateUserData();
                }
            })
        },
        async updatePwd(){
            let {oldPassword,newPassword} = this.formInline;
            let data = await PA_updatePwd({oldPassword,newPassword});
            if(data.code == 200){
                this.$Message.success(data.msg);
            }else{
                this.$Message.error(data.msg);
            }
        },
        async updateUserData(){
            let data = await PA_updateUserData(this.userForm);
            if(data.code == 200){
                this.$Message.success(data.msg);
                this.setUserData(Object.assign(this.getUserData,this.userForm))
            }else{
                this.$Message.error(data.msg);
            }
        },
        passwd(rule, value, callback){
            if (value === "") {
                callback(new Error("密码为必填项!"));
            } else {
                if(this.formInline.okPassword !== ''){
                    this.$refs.formInline.validateField('okPassword');
                }
                callback();
            }
        },
        passwdRepeat(rule, value, callback){
            if (value === "") {
                callback(new Error("确认密码为必填项!"));
            } else if (this.formInline.newPassword !== value) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        },
        loaderError(){

        },
        loaderSuccess(){

        },
        formatError(){
            this.$Message.error({
                content: '上传格式不正确，只接收jpg,jpeg,png',
                duration: 5,
                closable: true
            });
        },
        async getDeptData(){
            let data = await PA_getDeptData();
            let dept = formatTree(data.data,"deptId");
            let list = childrenFindFatherTree(dept,this.getUserData.deptId,'deptName','deptId');
            list.reverse();
            this.userDept =  `${list.join('/')}`
        },
        ...mapActions(["setUserData"])
    },
    computed:{
        ...mapGetters(['getUserData']),
        userRole(){
            let arr = []; 
            // debugger
            // this.getUserData.roles.map(e => {
            //     arr.push(e.roleName)
            // })
            return arr;
        },
        userForm(){
            return {
                userId:this.getUserData.userId,
                userName:this.getUserData.userName,
                phone:this.getUserData.phone,
                email:this.getUserData.email,
                sex:this.getUserData.sex,
            }
        },
    }
}