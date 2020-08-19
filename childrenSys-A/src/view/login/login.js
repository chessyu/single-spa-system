
import systemCofig from '../../../systemConfig.json'
import {CCP_login, CCP_getVerCodeImg, CCP_getUserdata} from '@/api/login.js'
import Cookies from "js-cookie";
import { encrypt, decrypt } from 'public-component-ui/utils/encrypt'
import { mapActions } from 'vuex'

export default{
    data(){
        return{
            systemCofig,
            formInline :{
                user: '',
                password: '',
                verCode:''
            },
            ruleInline : {
                user: [
                    { required: true, message: '账号为必填项', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码为必填项', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码过于敷衍', trigger: 'blur' }
                ],
                verCode:[
                    { required: true, message: '验证码为必填项', trigger: 'blur' },
                ]
            },
            remember : true,
            verCode:'',
            uuid:'',
            logType:'default'
        }
    },
    created(){
        let _this = this;
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode == 13){
                _this.singIn();
            }
        }
        this.getVerCode();
        this.getCookies();
        Cookies.remove("Admin-Token");
        localStorage.removeItem("vuex");
    },
    methods:{
        getCookies(){
            let userName = Cookies.get('userName');
            let password = Cookies.get('password');
            if(userName && password){
                this.formInline.user = userName;
                this.formInline.password = decrypt(password);
            }
        },
        async getVerCode (){
            let data = await CCP_getVerCodeImg();
            this.verCode = 'data:image/gif;base64,'+data.img;
            this.uuid = data.uuid;
        },
        singIn () {
            this.$refs['formInline'].validate(async (valid) => {
                if (valid) {
                    let {user,password,verCode} = this.formInline;
                    let data = await CCP_login({username:user,password:password,captcha:verCode,uuid:this.uuid});
                    if(data.code == 0){
                        if(this.remember){
                            Cookies.set("userName",this.formInline.user, { expires: 30 });
                            Cookies.set("password",encrypt(this.formInline.password), { expires: 30 });
                        }else{
                            Cookies.remove("userName");
                            Cookies.remove("password");
                        }
                        Cookies.set('Admin-Token',data.data,{expires: 30});
                        let userData = await CCP_getUserdata();
                        this.setUserData(userData.user);
                        if(process.env.NODE_ENV == 'development') this.setUserButtomPower(userData.permissions);
                        this.$router.push({name:'layout'})
                        this.$Message.success(data.msg);
                    }else{
                        this.$Message.error(data.msg);
                        this.getVerCode();
                    }
                }
            })
        },
        ...mapActions(['setUserData','setUserButtomPower']),
        focusUserName(){
            this.logType = "focusUserName"
        },
        focusPassWord(){
            this.logType = "focusPassword"
        },
        blur(){
            this.logType = 'default';
        },
    },

}