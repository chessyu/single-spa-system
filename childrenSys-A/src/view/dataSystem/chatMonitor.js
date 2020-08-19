import { IP_getCascadeSelect, IP_GetChatType,IP_GetAreaList} from '@/api/common.js'
import { IP_getChatMonitorData } from '@/api/dataSystem/chatMonitor.js'
import { mapGetters, mapActions } from 'vuex'
export default{
    name:'chatMonitor',
    data(){
        return{
            menuQuery:{                     //查询条件默认参数
                chatId:null, 
                gameId:null,
                zoneKey:'',
                snKey:'',
                areaId:'',
                roleId:'',
                roleName:'',
                chatType:'',
                chatTime:'',
            },
            zoneList:[],                           //专区标识列表
            snList:[],                               //渠道key值
            chatTypeList:[],
            chartList:[],
            lastList:{},
            areaList:[],
            ruleValidate:{
                gameId:[
                    { required: true, type: 'number', message: '请选择游戏', trigger: 'change' }
                ],
                zoneKey:[
                    { required: true,message: '专区标识不能为空', trigger: 'change' },
                    { type: 'string', max:16,message: '最大长度为16个字符', trigger: 'change' }
                ],
                chatTime:[
                    { required: true, type: 'date', message: '请选择时间', trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
        document.getElementById("sys__table").addEventListener("scroll", this.handleScroll, true);
    },
    methods:{
        query(){
            this.$refs.chatMonitorForm.validate(vali => {
                if(vali){
                    this.chartList = [];
                    delete this.menuQuery.chatId;
                    let newMenuQuery = this.$plugins.formatDateTimeToString(['chatTime'],this.menuQuery);
                    this.postData(newMenuQuery);
                }else{
                    this.$Message.error("必填项未填写内容");
                }
            })
        },
        async postData(params){
            let data = await IP_getChatMonitorData(params);
            if(data.code == 0){
                data.data.forEach((e,i) => {
                    let list = this.chatTypeList.filter(k => k.value == e.chatType);
                    e.chatTypeZH = list[0].label;
                    this.chartList.push(e)
                    if(data.data.length == Number(i+1)){
                        this.lastList = e;
                    }
                })
            }
            this.menuQuery.chatId = this.lastList.chatId;
        },
        handleScroll(){
            var scrollTop =  document.getElementById("sys__table").scrollTop; //取滚动条滚动数值
            var windowHeight = document.getElementById("sys__table").clientHeight; //取sys_table的可视区域
            var scrollHeight = document.getElementById("chartUl").scrollHeight;//取元素的总高度。
            if (scrollTop + windowHeight == scrollHeight) {
                //请求数据接口
                this.$nextTick(e => {
                    let newMenuQuery = this.$plugins.formatDateTimeToString(['chatTime'],this.menuQuery);
                    this.postData(newMenuQuery);
                })
                return false;
            }
        },
        reset(){
            this.$refs['chatMonitorForm'].resetFields();
        },
        chartSelect(item,event){
            let target = event.currentTarget;
            let preTarget = document.getElementsByClassName('actionLi');
            if(preTarget.length > 0){
                preTarget[0].classList.remove('actionLi');
            }
            target.classList.add('actionLi');
        },
        async getChartType(value){  //获取聊天类型
            let obj = {};
            obj.lookup = 'chatType'
            obj.params = value;
            let data = await IP_GetChatType(obj);
            if(data.code == 0){
                let list = JSON.parse(data.data[0].chatType);
                this.chatTypeList = Object.keys(list).map(e => {
                    let typeObj = {};
                    typeObj.label = list[e];
                    typeObj.value = e;
                    return typeObj;
                })
            }
        },
        async getAreaList(value){   //获取区服数据
            let obj = {};
            obj.lookup = 'area'
            obj.params = value;
            let data = await IP_GetAreaList(obj);
            if(data.code == 0){
                this.areaList = data.data;
            }
        },
        async postUrl({lookup,params}){
            let data  = await IP_getCascadeSelect({lookup,params});
            if(data.code == 0){
                let obj = {},children={};
                children[lookup +"_&_"+params] = data.data;
                obj[lookup] = Object.assign(this.getCacheData[lookup] || {}  ,children);
                this.setCacheData(obj)
                this[lookup+'List'] = data.data;
                console.log(this.getCacheData);
            }
        },
        //游戏选择列改变事件
        gameSelect(value){
            this.getChartType(value);
            this.menuQuery.snKey = null;
            this.snList = [];
            let list = this.getCacheData.zone || {};
            let keys = Object.keys(list).map(e => Number(e.split('_&_')[1]));
            if(keys.includes(value)){
                this.zoneList = list['zone'+"_&_"+value];
                return;
            }
            this.postUrl({lookup:'zone',params:value});
        },
        //专区选择列改变事件
        zoneSelect(value){
            this.getAreaList(value);
            let list = this.getCacheData.sn || {};
            let keys = Object.keys(list).map(e => e.split('_&_')[1]);
            if(keys.includes(value)){
                this.snList = list['sn'+"_&_"+value];
                return;
            }
            this.postUrl({lookup:'sn',params:value});
        },
        ...mapActions(["setCacheData"])
    },
    computed:{
        ...mapGetters(["getCacheData"]),
        gameList(){
            return this.getCacheData.game;
        },
    }
    
}
    