
import {PA_login, PA_getVerCodeImg, PA_getUserdata,PA_getCacheModel, PA_getCacheData} from '@/api/login.js'
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/encrypt.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default{
    data(){
        return{
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
                    { required: true, message: '验证码为必填项', trigger: 'blur' }
                ]
            },
            remember : true,
            verCode:'',
            uuid:'',
            logType:'default'
        }
    },
    mounted(){
        let _this = this;
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode == 13){
                _this.singIn();
            }
        };
        this.formInline.verCode = "";
        this.getVerCode();
        this.getCookies();
        Cookies.remove("Admin-Token");
        localStorage.removeItem("vuex");
        let layoutTag = this.getLayoutTag;
        let firstTag = layoutTag.shift();
        firstTag.active = true;
        this.setLayoutTag([firstTag]);
    },
    methods:{
        getCookies(){
            let userName = Cookies.get('userName');
            let password = Cookies.get('password');
            if(userName && password){
                this.formInline.user = userName;
                this.formInline.password = decrypt(password);
            };
        },
        async getVerCode (){
            let data = await PA_getVerCodeImg();
            this.verCode = data.data;
            this.uuid = data.uuid;
        },
        singIn () {
            this.$refs['formInline'].validate(async (valid) => {
                if (valid) {
                    let {user,password,verCode} = this.formInline;
                    let data = await PA_login({username:user,password:password,captcha:verCode,uuid:this.uuid});
                    if(data.code == 200){
                        if(this.remember){
                            Cookies.set("userName",this.formInline.user, { expires: 30 });
                            Cookies.set("password",encrypt(this.formInline.password), { expires: 30 });
                        }else{
                            Cookies.remove("userName");
                            Cookies.remove("password");
                        }
                        Cookies.set('Admin-Token',data.data,{expires: 30});
                        let userData = await PA_getUserdata();
                        this.setUserData(userData.data.user);
                        this.setUserButtomPower(userData.data.permissions);
                        this.$router.push({name:'layout'})
                        this.$Message.success(data.msg);
                        // this.getCacheDataList();
                    }else{
                        this.$Message.error(data.msg);
                        this.getVerCode();
                    }
                };
            });
        },
        //取需要缓存的字段
        async getCacheDataList(){
            let data = await PA_getCacheModel();
            data.data.forEach(e => {
                this.getData(e)
            });
        },
        //根据字段获得字段数据
        async getData(e){
            let list = await PA_getCacheData(e);
            let obj = {};
            obj[e] = list.data;
            this.setCacheData(obj);
        },
        ...mapActions(['setUserData','setUserButtomPower','setCacheData']),
        ...mapMutations(['setLayoutTag']),
        focusUserName(){
            this.logType = "focusUserName"
        },
        focusPassWord(){
            this.logType = "focusPassword"
        },
        blur(){
            this.logType = 'default';
        }
    },
    computed:{
        ...mapGetters(['getLayoutTag'])
    }

}