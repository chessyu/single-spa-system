import systemStting from '@/component/systemStting/systemStting.vue'
import Cookies from 'js-cookie'
import { mapGetters, mapMutations } from 'vuex'
import { PA_getMenuList, PA_getChildrenModel } from '../api/layout.js'
import SystemConfig from '../config'


export default {
  props:["isMainFrame"],
  components:{
    systemStting,
  },
  data() {
    return {
      bread: ["信息平台","系统配置","平台首页"],
      isCollapsed: false, //菜单是否默认展开
      showIcon: false, //是否显示两边菜单切换按钮
      menuDefaultActive:'index',
      tagListWidth: 0, //选项卡的总宽度
      moveWidth: 0, //当前平移的数
      openThemeConf: false,  //配置主题
      menu: [],                        //菜单
      layoutTag:[],                 //标签
      currentSystem:{                //当前选中的系统名称
        systemName:'',
        systemCode:'',
        systemIcon:""
      }, 
      sonSystem:[
        // {
        //   menuId:11,
        //   icon:'ios-color-palette',
        //   menuName:'平台配置',
        //   code:'CRM',
        // },
      ],
      loaderSuccessChildrenSys:[],   //加载成功的子系统
      childrenSysData:[],                  //加载子系统时所需的依赖项，，权限需求

      openMenu:[],                            //展开菜单缓存
      local:[],                                    //缓存操作的dom
    };
  },
  beforeMount(){
    this.initViewPort();
  },
  mounted() { 
    //绑定缓存中已开标签数据
    this.layoutTag = this.getLayoutTag;
    
    this.sonSystemAction();

    if(this.isMainFrame.toString() === "true"){
      this.getChildrenModel();               //取权限下的子系统数据
      this.initRouter(); //初始化 绑定所有子系统的路由到平台路由下
    }else{
      this.getDefultMenuList(this.isMainFrame);
    }
  },
  methods: {
    //初始化 绑定所有子系统的路由到平台路由下
    initRouter(){  
      window.addEventListener("message", e => {
        // 要加参数。取到所有当前用户有权限的子系统名称 。完全加载完后执行。
        if(e.data.isSonSys){
          this.$Notice.success({
            title: '系统加载通知',
            desc: e.data.msg,
            name:e.data.systemCode,
            duration:2
          })
          this.loaderSuccessChildrenSys.push(e.data.systemCode);
          window.$spaConfig.forEach((element,i) => {
            if(element.projectCode !== SystemConfig.mainSys){
              element.router['default'].map(e => {
                if(e.name == "layout"){
                  e.children.map(k=>{
                    this.$router.options.routes[3].children.push(k);
                  })
                }   
              })
            }
          });
          this.$router.addRoutes(this.$router.options.routes);
          this.$store.commit("editRouterConfig",this.$router.options.routes)
        }
      }, false)
    },
    //解决 切换子系统 刷新时的处理
    sonSystemAction(){
      if(!this.getSysConfig.keepAliveTag){  //当全局配置保留新开标签
        //刷新重定向 平台首页，并选中
        this.layoutTag = this.getLayoutTag.filter(e => {
          if(e.module == this.currentSystem.systemCode || e.module == null){
            return e
          }
        })
        this.getLayoutTag.map(e=> e.path == "index" ? e.active= true : e.active = false)
        this.$router.push({"name":"index"});
        this.$nextTick(e => {
          this.TagActive("index")
        })
      }else{
        let action = this.getLayoutTag.filter(e => e.active == true);
        // if(action[0].isSonSys){
          this.$router.push({"name":"index"});
          this.$nextTick(e => {
            this.TagActive("index")
          })
        // }
      }
    },
    //获取默认选中的系统菜单数据
    async getDefultMenuList(menuId,module) {
      
      //取出数据 进行整理；
      let menuList = await PA_getMenuList({projectId:menuId});
      this.menu = menuList.data;
    },
    //获取有子系统权限数据
    async getChildrenModel(){
      let data = await PA_getChildrenModel();
      let childrenData = []

      data.data.map(e=>{ 
        this.childrenSysData.push(e.system_code);
        
        childrenData.push({
          menuId : e.system_id,
          icon:e.icon,
          systemName:e.system_name,
          code:e.system_code
        })
      })
      
     
      this.sonSystem = childrenData;
      let hasAbpModel = childrenData.filter(e => e.code == SystemConfig.mainSys)   //判断当前用户有没有《基础平台》的权限
      if(hasAbpModel.length){
        //将本地路由挂载到window上的$spaConfig属性上
        let router = JSON.parse(JSON.stringify(this.$router.options.routes))
        window.$spaConfig = [{
          projectCode:SystemConfig.mainSys,
          projectName: SystemConfig.systemName,
          router:router
        }]
        this.loaderSuccessChildrenSys.push(SystemConfig.mainSys);
      }

      this.getDefultMenuList( childrenData[0].menuId,childrenData[0].code);  //获取默认选中平台系统的菜单数据
      this.currentSystem = {                //当前选中的系统名称
        systemName:childrenData[0].systemName,
        systemCode:childrenData[0].code,
        systemIcon:childrenData[0].icon
      };
      this.system();   //加载所有子系统
    },
    //操作菜单折叠
    collapsedSider() {
      this.$refs.sideHeader.toggleCollapse();
    },
    //选项卡切换
    checked(index, event) {
      if((!this.loaderSuccessChildrenSys.includes( this.currentSystem.systemCode )) && this.isMainFrame.toString() === 'true'){  //子系统未加载完成时所做操作时的提示
        this.$Message.error('当前界面模块正在加载中，请稍候重试！');
        return
      }
      let nodeName = event.target.nodeName; //取点击元素的节点名。
      let parent =  event.target.parentNode; //取点击元素的父元素。div
      if (nodeName == "I") {
        this.$nextTick(() => {
          this.tagListWidth = this.tagListWidth - parent.offsetWidth;
          let parentsW = parent.parentNode.offsetWidth;
          let pre = parent.previousElementSibling;
          this.TagActive(pre.getAttribute("to"));
          this.routerChange(index - 1) ? this.$router.push(pre.getAttribute("routerPath")) : this.$router.push({name:pre.getAttribute("to")});
          this.getLayoutTag.splice(~~parent.getAttribute("index"), 1);
          this.getLayoutTag.forEach((e,i)=>{e.index = i});
          if (this.tagListWidth < parentsW) {
            this.showIcon = false;
            document.getElementsByClassName("tag_list")[0].style.width = "calc(100% - 28px)";
          }
          this.getLayoutTag.map(e => { e.path == pre.getAttribute("to")? e.active = true : e.active = false})
          this.isCloseTag();
        });
      } else if (nodeName == "DIV") {
        for (let i = 0; i < event.target.parentNode.children.length; i++) {
          if (i == index) {
            event.target.parentNode.children[index].classList.add( "c_tag__active" );
          } else {
            event.target.parentNode.children[i].classList.remove( "c_tag__active" );
          }
        }
        this.routerChange(index) ? this.$router.push(event.target.parentNode.children[index].getAttribute("routerPath")) : this.$router.push({name:event.target.parentNode.children[index].getAttribute("to")});
        this.getLayoutTag.map(e => { e.path == event.target.parentNode.children[index].getAttribute("to")? e.active = true : e.active = false})
        this.isCloseTag();
        // this.breadcrumbItem(event);  //当切换时要改面包屑
      } else if (nodeName == "SPAN") {
        for (let i = 0; i < parent.parentNode.children.length; i++) {
          if (i == index) {
            parent.parentNode.children[index].classList.add("c_tag__active");
          } else {
            parent.parentNode.children[i].classList.remove("c_tag__active");
          }
        }
        this.routerChange(index) ? this.$router.push(parent.parentNode.children[index].getAttribute("routerPath")) : this.$router.push({name:parent.parentNode.children[index].getAttribute("to")});
        this.getLayoutTag.map(e => { e.path == parent.parentNode.children[index].getAttribute("to")? e.active = true : e.active = false})
        this.isCloseTag();
        // this.breadcrumbItem(event);  //当切换时要改面包屑
      }
    },
    //给选项卡加active样式
    TagActive(pathname) {
      this.menuDefaultActive = pathname;
      let tagActive = document.getElementsByClassName("tag_list")[0].children;
      this.$nextTick(() => {
        for (let i = 0; i < tagActive.length; i++) {
          if (pathname === tagActive[i].getAttribute("to")) {
            tagActive[i].classList.add("c_tag__active");
            if (i > tagActive.length / 2) {
              this.ckRight();
            } else {
              this.ckLeft();
            }
          } else {
            tagActive[i].classList.remove("c_tag__active");
          }
        }
      });
    },
    //打开菜单 新增选项卡
    openMenuItem(path,type) {
      let hasTag = this.getLayoutTag.filter(e => e.path === path);

      if (hasTag.length === 0) {
        this.getLayoutTag.map(e => { e.active = false});
        let isSonSysTYpe = this.currentSystem.systemCode == SystemConfig.mainSys;
        let routerPath = "/"+path.split('_').join('/');

        this.getLayoutTag.push({
          name: event.currentTarget.getAttribute("title") || event.currentTarget.innerText,
          path:  path,
          index: this.getLayoutTag.length,
          active:true,
          isSonSys:isSonSysTYpe,
          module:this.currentSystem.systemCode,
          routerPath
        })
        this.isCloseTag();
        this.$nextTick(() => {
          let parentNW = document.getElementsByClassName("tag_list")[0].offsetWidth;
          let Width = 0,list = document.getElementsByClassName("tag_list")[0].children;
          for (let i = 0; i < list.length; i++) {
            Width += list[i].offsetWidth + 4;
          }
          if (Width > parentNW) {
            this.showIcon = true;
            this.tagListWidth = Width;
            document.getElementsByClassName("tag_list")[0].style.width = "calc(100% - 90px)";
          }
          this.TagActive(path);
        });
      } else {
        this.TagActive(hasTag[0].path);
      }
    },
    //全局导航
    breadcrumbItem(event) {
      //有待改进，
      // let menuBox = document.getElementById('menuItem');
      // let activeEl = menuBox.getElementsByClassName('ivu-menu-item-active');
      // console.log(activeEl)
      // debugger

      let currentTarget = event.currentTarget.innerText;
      let parents = event.currentTarget.parentNode.previousElementSibling.innerText;
      let systemName = document.getElementsByClassName("link__active")[0].innerText;
      this.bread = ['发行平台',systemName,currentTarget];
      if(parents !== '发行平台') this.bread.splice(2,0,parents);
    },
    //往左切换
    ckLeft() {
      let tagList = document.getElementsByClassName("c_tag");
      for (let i = 0; i < tagList.length; i++) {
        tagList[i].style.transform = `translateX(0px)`;
        tagList[i].style.transition = `all .3s ease-in-out`; //    transition: all .3s ease-in-out;
      }
    },
    //往右切换
    ckRight() {
      let tagParent = document.getElementsByClassName("tag_list")[0]
        .offsetWidth;
      let tagList = document.getElementsByClassName("c_tag");
      for (let i = 0; i < tagList.length; i++) {
        tagList[i].style.transform = `translateX(-${this.tagListWidth -
          tagParent}px)`;
        tagList[i].style.transition = `all .3s ease-in-out`;
      }
    },
    //批量关闭选项卡
    closeTag(name) {
      let index,length;
      let key = document
        .getElementsByClassName("c_tag__active")[0]
        .getAttribute("to");
      if(!this.getSysConfig.keepAliveTag){
        length = this.layoutTag.length;
        index =  document
        .getElementsByClassName("c_tag__active")[0]
        .getAttribute("sysIndex");
      }else{
        length = this.getLayoutTag.length;
        index = Number(
          document
            .getElementsByClassName("c_tag__active")[0]
            .getAttribute("sysIndex")
        );
      }
      if (name == "left") {
        if(!this.getSysConfig.keepAliveTag){
          this.deletedLayoutTag("left",index);
        }else{
          this.getLayoutTag.splice(1, index - 1)
        }
      }
      if (name == "right") {
        if(!this.getSysConfig.keepAliveTag){
          this.deletedLayoutTag("right",index);
        }else{
          this.getLayoutTag.splice(index + 1, length)
        }
      }
      if (name == "other") {
        if(!this.getSysConfig.keepAliveTag){
          this.deletedLayoutTag("other",index);
        }else{
          this.getLayoutTag.splice(1, index - 1)
          this.getLayoutTag.splice(2, length)
        }
      }
      if (name == "all") {
        if(!this.getSysConfig.keepAliveTag){
          this.deletedLayoutTag("all",index);
        }else{
          this.getLayoutTag.splice(1, length)
        }
        this.$router.push({"name":"index"});
        this.getLayoutTag[0].active = true;
      }
      this.getLayoutTag.forEach((e,i)=>{e.index = i});
      this.isCloseTag();
      this.TagActive(key);
      this.$nextTick(() => {
        if(this.layoutTag.length == 1){
          let firstTag = document.getElementsByClassName("c_tag")[0];
          firstTag.classList.add('c_tag__active');
          firstTag.style.transform = `translateX(0px)`;
          this.tagListWidth = firstTag.offsetWidth;
        } else if(this.layoutTag.length == 2){
          let firstTag = document.getElementsByClassName("c_tag");
          let offsetW = 0;
          for(var i =0; i<firstTag.length; i++){
            firstTag[i].style.transform = `translateX(0px)`;
            offsetW += firstTag[i].offsetWidth;
          }
          this.tagListWidth = offsetW;
        }
        let parentsW = document.getElementsByClassName("tag_list")[0]
          .offsetWidth;
        let Width = 0,
          list = document.getElementsByClassName("tag_list")[0].children;
        for (let i = 0; i < list.length; i++) {
          Width += list[i].offsetWidth + 4;
        }
        if (Width < parentsW) {
          this.showIcon = false;
          document.getElementsByClassName("tag_list")[0].style.width = "calc(100% - 28px)";
        }
      });
    },
    //删除store内的标签数据
    deletedLayoutTag(type,index){
      //根据类型取删除元素
      let deleted;
      switch(type){
        case "left":
          deleted = this.layoutTag.filter((e,i) => {
            if(i < index && i > 0){
              return e;
            }
          });
          break;
        case "right" :
          deleted = this.layoutTag.filter((e,i) => {
            if(i > index){
              return e;
            }
          });
          break;
        case "other" :
          deleted = this.layoutTag.filter((e,i) => {
            if(i > index || (i < index && i > 0)){
              return e;
            }
          });
          break;
          case "all" :
            deleted = this.layoutTag.filter((e,i) => {
              if(i > 0){
                return e;
              }
            });
            break;
      }
      deleted.forEach((e, i)=> {
        this.getLayoutTag.forEach((n,m) => {
          if(e.path == n.path){
            delete this.getLayoutTag[m]
          }
        })
      })
      this.$store.commit("setLayoutTag",this.getLayoutTag.filter(e => e != undefined))
    },
    //账号
    selectItem(name) {
      if (name == "singOut") {
        //退出
        this.$Modal.confirm({
          title:'系统提示',
          content:'确定注销并退出系统吗?',
          okText: '确定退出',
          cancelText:'取消',
          closable:true,
          onOk:() => {
            window.location.href = '/login'
            // this.$router.push({ "name": "login" });
          },
        })
      }
      if(name == "userCenter"){
        //个人中心
        this.$router.push({'name':"userCenter"});
        this.openMenuItem('userCenter',1)
      }
    },
    //打开配置主题抽屉
    openDrawer(type){
      if(typeof type === "boolean"){
          this.openThemeConf = false;
      }else{
          this.openThemeConf = true;
      }
    },
    //选择子应用
    selectSetem(item){
      item = JSON.parse(item);
      if(!this.loaderSuccessChildrenSys.includes(item.code)){   //子系统未加载完成时所做操作时的提示
        this.$Message.error('当前子系统正在加载中，请稍候！');
        return
      }
      this.currentSystem.systemName = item.systemName;
      this.currentSystem.systemCode=item.code;
      this.currentSystem.systemIcon = item.icon;

      this.$nextTick(()=>{
        this.getDefultMenuList(Number(item.menuId),item.code);
        let router;
        window.$spaConfig.forEach((element,i) => {
          if(element.projectCode ==item.code){
            router = element.router["default"] || element.router
            router = router.filter(e => e.name == 'layout')[0].children
          }
        });
        if(this.getSysConfig.keepAliveTag){
          this.layoutTag = this.getLayoutTag;
        }else{

          //保留历史新开标签
          this.layoutTag = this.getLayoutTag.filter(e => {
            if(e.path == "index"){
              e.active = true;
            }else{
              e.active = false;
            }
            if(e.module === item.code || e.module == null ){
              return e;
            }
          });
          this.$router.push({"name":"index"})
        }
      })
    },
    //加载所有子系统数据
    system(){
      let _this = this;
      Promise.all([window.System.import('single-spa'), window.System.import('vue'), window.System.import('vue-router')]).then(function (modules) {
        var singleSpa = modules[0];
        var Vue = modules[1];
        var VueRouter = modules[2];

        Vue.use(VueRouter)
        let singleName = singleSpa.getMountedApps();
        if(singleName.length > 0){
          for(let i=0; i< singleName.length; i++){
            singleSpa.unloadApplication(singleName[i], {waitForUnmount: false})
          }
        }

        _this.sonSystem.map((item,index) => {
          if(!index) return;
          singleSpa.registerApplication(
            item.systemName,
            () => window.System.import(item.code), 
            // () => window.System.import(ccp),                //通过缓存拉取子项目的依赖。
            location =>  true ,
            {"customProps":{
              // "token": Cookies.get("Admin-Token"),
              "cacheData":_this.getCacheData
            }}
          );
        })

        // if(_this.childrenSysData.includes("ORM")){
        //   singleSpa.registerApplication(
        //     '中控平台',
        //     () => window.System.import('ORM'), 
        //     // () => window.System.import(ccp),                //通过缓存拉取子项目的依赖。
        //     location =>  true ,
        //     {"customProps":{
        //       "token": Cookies.get("Admin-Token"),
        //       "cacheData":_this.getCacheData
        //     }}
        //   );
        // }

        // if(_this.childrenSysData.includes("CCP")){
        //   singleSpa.registerApplication(
        //     '中控平台',
        //     () => window.System.import('CCP'), 
        //     // () => window.System.import(ccp),                //通过缓存拉取子项目的依赖。
        //     location =>  true ,
        //     {"customProps":{
        //       "token": Cookies.get("Admin-Token"),
        //       "cacheData":_this.getCacheData
        //     }}
        //   );
        // }
        singleSpa.start();
      })
    },
    //根据配置加载对应的应用
    loaderAppUrl(url){
      return new Promise((resolve,reject)=>{
        if (url) {
          resolve(url);
        } else {
            reject(error); 
        }
      })
    },
    //是否关闭标签保留
    isCloseTag(){
      if(!this.getSysConfig.keepAliveTag){
        this.layoutTag = this.getLayoutTag.filter(e => e.module == this.currentSystem.systemCode || e.module == null)
      }else{
        this.layoutTag = this.getLayoutTag;
      }
    },
    //初始化 store 里的视口宽高 
    initViewPort(){
      let _this = this;
      if(document.body.clientWidth < 1024) this.isCollapsed = true;

      window.onresize=function(){  
        var Width = window.innerWidth//浏览器窗口的内部宽度（包括滚动条）
                        || document.documentElement.clientWidth
                        || document.body.clientWidth;
        var Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）
                        || document.documentElement.clientWidth
                        || document.body.clientHeight;
        _this.$store.commit("setViewPort",{
          width:Width,
          height:Height
        })
        
        if(Width < 1024){
          _this.isCollapsed = true;
        }else{
          _this.isCollapsed = false;
        }
      }
    },
    //以路由地址进行切换、
    routerChange(index){
      let getModules = this.getLayoutTag[index].module;
      if( SystemConfig.useRouter.includes(getModules)){
        return true;
      }
      return false;
    },
    //展开菜单事件
    openChange(menuName){
      this.openMenu = menuName;
    },
    //菜单闭合时的处理
    menuCloseHandle(boolean){
      let className = document.getElementsByClassName("ivu-menu-opened");
      if(boolean){

        className.forEach(e => {
          this.local.push(e);
          e.lastElementChild.style.display = "none";
          e.classList.remove("ivu-menu-opened");
        })
      }else{
        this.local.forEach(m => {
          m.lastElementChild.style.display = "block";
          m.classList.add("ivu-menu-opened");
        })
        this.local = [];
      }
    },
    ...mapMutations(['editRouterConfig'])
  },
  computed: {
    menuitemClasses() {
      return [
        "menuHeight",
        "menu-item",
        this.isCollapsed ? "collapsed-menu" : ""
      ];
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    ...mapGetters(["getUserData","getSysConfig","getLayoutTag","getRoutersConfig","getViewPort","getCacheData"]),
    getCacheTemplate(){
      return this.getLayoutTag.map(e => {
        return e.path;
      })
    }
  },
  watch:{
    getLayoutTag:{
      handler(newval, oldVal){
        this.$store.commit('setLayoutTag',newval)
        this.$nextTick(e => {
          newval.map(el => {
            if(el.active){
              this.menuDefaultActive = el.path;
              this.$refs.layoutMenu.updateActiveName()
            }
          })
        })
      },
      deep:true
    },
    isCollapsed(newVal){
      
      this.menuCloseHandle(newVal);
    },
  },
};
