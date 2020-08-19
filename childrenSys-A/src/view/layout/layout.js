import systemCofig from '../../../systemConfig.json'
import systemStting from '@/component/systemStting/systemStting.vue'
import { mapGetters } from 'vuex'
import { getMenuList } from '@/api/layout.js'

export default {
  components:{
    systemStting
  },
  data() {
    return {
      systemCofig,
      isCollapsed: false, //菜单是否默认展开
      menuDefaultActive: "ccpIndex", //定义菜单默认选中
      showIcon: false, //是否显示两边菜单切换按钮
      tagListWidth: 0, //选项卡的总宽度
      moveWidth: 0, //当前平移的数
      openThemeConf: false, //配置主题
      tag: [
        {
          path: "ccpIndex",
          index: 0,
          name: "首页"
        }
      ],
      menu: [],
    };
  },
  mounted() {
    this.getDefultMenuList(systemCofig.systemMenuId);  //获取默认选中系统的菜单数据
    if(process.env.NODE_ENV == 'development'){ this.initViewPort()}
  },
  methods: {
    //获取默认选中的系统菜单数据
    async getDefultMenuList(menuId) {
      //取出数据 进行整理；
      let menuList = await getMenuList({projectId:menuId});
      menuList.data.unshift({
        meta:{title: "首页",icon: "logo-bitcoin",},
        path:'ccpIndex',
        component: `/${this.systemCofig.systemCode}/index`,
        children: []
      })
      this.menu = menuList.data;
    },
    //操作菜单折叠
    collapsedSider() {
      this.$refs.sideHeader.toggleCollapse();
    },
    //选项卡切换
    checked(index, event) {
      let nodeName = event.target.nodeName; //取点击元素的节点名。
      let parent = event.target.parentNode; //取点击元素的父元素。div
      if (nodeName == "I") {
        this.$nextTick(() => {
          this.tagListWidth = this.tagListWidth - parent.offsetWidth;
          let parentsW = parent.parentNode.offsetWidth;
          let pre = parent.previousElementSibling;
          // parent.parentNode.removeChild(parent);
          this.TagActive(pre.getAttribute("to"));
          this.$router.push({name:pre.getAttribute("to")});
          this.tag.splice(~~parent.getAttribute("index"), 1);
          this.menuDefaultActive = pre.getAttribute("to");
          if (this.tagListWidth < parentsW) {
            this.showIcon = false;
            document.getElementsByClassName("tag_list")[0].style.width = "calc(100% - 28px)";
          }
        });
      } else if (nodeName == "DIV") {
        for (let i = 0; i < event.target.parentNode.children.length; i++) {
          if (i == index) {
            event.target.parentNode.children[index].classList.add(
              "c_tag__active"
            );
          } else {
            event.target.parentNode.children[i].classList.remove(
              "c_tag__active"
            );
          }
        }
        this.$router.push({name:event.target.parentNode.children[index].getAttribute("to")});
        this.menuDefaultActive = event.target.parentNode.children[
          index
        ].getAttribute("to");
      } else if (nodeName == "SPAN") {
        for (let i = 0; i < parent.parentNode.children.length; i++) {
          if (i == index) {
            parent.parentNode.children[index].classList.add("c_tag__active");
          } else {
            parent.parentNode.children[i].classList.remove("c_tag__active");
          }
        }
        this.$router.push({name:parent.parentNode.children[index].getAttribute("to")});
        this.menuDefaultActive = parent.parentNode.children[index].getAttribute(
          "to"
        );
      }
    },
    //给选项卡加active样式
    TagActive(pathname) {
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
    //打开菜单
    openMenuItem(key) {
      this.menuDefaultActive = key;
      let hasTag = this.tag.filter(e => e.path === key);
      if (hasTag.length === 0) {
        let menuName = event.target.textContent;
        this.tag.push({
          name: menuName,
          path: key,
          index: this.tag.length
        });
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
          this.TagActive(key);
        });
      } else {
        this.TagActive(hasTag[0].path);
      }
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
      let index = Number(
        document
          .getElementsByClassName("c_tag__active")[0]
          .getAttribute("index")
      );
      let key = document
        .getElementsByClassName("c_tag__active")[0]
        .getAttribute("to");
      let length = this.tag.length;
      if (name == "left") {
        this.tag.splice(1, index - 1);
        this.TagActive(key);
      }
      if (name == "right") {
        this.tag.splice(index + 1, length);
      }
      if (name == "other") {
        this.tag.splice(1, index - 1);
        this.tag.splice(2, length);
        this.TagActive(key);
      }
      if (name == "all") {
        this.tag.splice(1, length);
        this.TagActive("ccpIndex");
        this.$router.push({name:"ccpIndex"});
        this.menuDefaultActive = "ccpIndex";
      }
      this.$nextTick(() => {
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
            this.closeTag('all')
            this.$router.push({ "name": "login" });
          },
        })
      }
      if(name == "userCenter"){
        //个人中心
        this.$router.push({'name':"userCenter"});
        this.openMenuItem('userCenter')
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
    //初始化 store 里的视口宽高 
    initViewPort(){
      let _this = this;
      if(document.body.clientWidth < 1024) this.isCollapsed = true;
      this.$store.commit("setViewPort",{
        width:document.body.clientWidth,
        height:document.body.clientHeight
      })
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
    ...mapGetters(["getUserData"]),
  }
};
