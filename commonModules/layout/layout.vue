
<template>
  <div class="ht__layout-wrap" ref="layout">
    <Layout class="layout">
      <Header class="ht__header">
        <div class="ht_logo">
          <Icon class="logo" custom="iconfont icon-logo_ysstech" />
          <span class="logo_name">Administration</span>
        </div>
        <Icon
          @click.native="collapsedSider"
          type="md-menu"
          :class="['title_icon',isCollapsed?'rotate-icon':'']"
          size="20"
        ></Icon>
        <Input prefix="ios-search" placeholder="搜索菜单" class="title-seach" />
        <Dropdown trigger="click" class="ht_changeSys" @on-click="selectSetem" v-if="isMainFrame.toString() == 'true'">
            {{currentSystem.systemName}}
            <Icon  custom="iconfont icon-icon-qihuan"  size="16" style="vertical-align: inherit;" />
            <span class="ht_division">|</span>
          <DropdownMenu slot="list">
              <DropdownItem v-for="(item,index) in sonSystem" 
              :key="index" 
              :name="JSON.stringify(item)"
              :menuId="item.menuId"
              :sysCode="item.code"
              :sysIcon="item.icon" v-show="item.systemName !== currentSystem.systemName">{{item.systemName}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <Dropdown class="title-item" @on-click="selectItem">
          <img src="../assets/img/header.jpg" />
          <span class="long_name">Sevent</span>
          <DropdownMenu slot="list">
            <DropdownItem name="userCenter">
              <Icon type="ios-contact" />个人中心
            </DropdownItem>
            <DropdownItem name="singOut" divided>
              <Icon type="ios-log-out" />退出
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
      </Header>
      <Layout class="ht__content">
          <Sider ref="sideHeader" hide-trigger collapsible :collapsed-width="50" v-model="isCollapsed" class="layout__collapsible">
            <Menu v-show="!isCollapsed" ref="layoutMenu" id="menuItem" :open-names="openMenu"  accordion :active-name="menuDefaultActive" @on-select="openMenuItem" @on-open-change="openChange" width="auto" :class="['menu-item',isCollapsed ? 'collapsed-menu' : '']">
                <template v-for="(item,index) in menu">
                  <MenuItem :title="item.title" :to="item.path" append :pathName="item.component" :name="item.component"  :key="index" v-if="item.children.length == 0">
                      <Icon :type="item.icon"></Icon>
                      <span>{{item.title}}</span>
                  </MenuItem>
                  <Submenu :title="item.title" :name="item.component"  :key="index" v-else>
                    <template  slot="title">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.title}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <!-- <MenuItem :to="key.component" append :name="key.name" :key="i" v-for="(key,i) in item.children"><span>{{key.title}}</span></MenuItem> -->
                    <!-- 三级菜单 --> 
                    <template v-for="(key,i) in item.children">
                      <MenuItem :title="key.title" :to="key.path" :pathName="key.component" append :name="key.component" :key="i" v-if="key.children.length == 0"><span>{{key.title}}</span></MenuItem>
                      <Submenu :title="key.title" :name="key.component" :key="i" v-else>
                        <template  slot="title">
                            <span :title="key.title">{{key.title}}</span>
                        </template>
                        <MenuItem :title="m.title" :to="m.path" :pathName="m.component" append :name="m.component" :key="n" v-for="(m,n) in key.children"><span>{{m.title}}</span></MenuItem>
                      </Submenu>
                    </template>
                  </Submenu>
                </template>
            </Menu>
            <div v-show="isCollapsed" class="ht_menu-collapsed">
              <div class="mc_list" v-for="(item,index) in menu" :key="index">
                <Icon class="mc_icon" :type="item.icon"></Icon>
                <ul class="mc_children-item">
                  <template v-for="(key,i) in item.children" >
                    <router-link   :key="i" :class="['mc_children-li', menuDefaultActive == key.component ? 'mc_children-li-active':'']" tag="li" :to="key.path" :pathName="key.component" :name="key.component" v-if="key.children.length == 0">
                      <span class="mc_span" @click="openMenuItem(key.component)">{{key.title}}</span>
                    </router-link>
                    <li v-else :key="i" class="mc_children-li mc_hasChildren" :pathName="key.component">
                        <span  class="mc_span">{{key.title}}</span>
                        <Icon type="ios-arrow-forward" style="position: absolute;right: 0;top: 15px;"/>
                        <ul class=" mc_child-child-ul">
                          <router-link v-for="(m,n) in key.children"  :key="n" :class="['mc_children-li', menuDefaultActive == m.component ? 'mc_children-li-active':'']" tag="li" :to="m.path" :pathName="m.component" :name="m.component" >
                            <span class="mc_span"  @click="openMenuItem(m.component)">{{m.title}}</span>
                          </router-link>
                        </ul>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </Sider>
          <Content class="ht__router-view" >
          <div class="content_tag">
              <div class="tag_icon-left tag_icon" v-show="showIcon" @click="ckLeft">
                <Icon type="ios-arrow-back top_icon" />
              </div>
              <div class="tag_list">
                <div
                  :class="['c_tag',item.active ? 'c_tag__active':'']"
                  v-for="(item,index) in layoutTag"
                  :key="index"
                  @click.stop="checked(index,$event)"
                  :sysIndex="index"
                  :index="item.index"
                  :to="item.path" 
                  :isSonSys="item.isSonSys"
                  :SonSysName="item.module"
                  :routerPath="item.routerPath"
                >
                  <span></span>
                  <span>{{item.name}}</span>
                  <Icon type="md-close" v-if="index > 0" />
                </div>
              </div>
              <div class="tag_icon-right tag_icon" v-show="showIcon" @click="ckRight">
                <Icon type="ios-arrow-forward top_icon" />
              </div>
              <Dropdown trigger="click" @on-click="closeTag">
                <Icon type="ios-arrow-down top_icon"></Icon>
                <DropdownMenu slot="list" class="tag_icon-close">
                  <DropdownItem name="left">
                    <Icon type="md-arrow-round-back"></Icon>关闭左侧
                  </DropdownItem>
                  <DropdownItem name="right">
                    <Icon type="md-arrow-round-forward" />关闭右侧
                  </DropdownItem>
                  <DropdownItem name="other">
                    <Icon type="md-close" />关闭其它
                  </DropdownItem>
                  <DropdownItem name="all">
                    <Icon type="md-close-circle" />关闭全部
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Content class="system_view" id="showView">
              <keep-alive  :include="getCacheTemplate"><router-view /></keep-alive>
            </Content>
          </Content>
      </Layout>
    </Layout>
    <!-- <system-stting :openThemeConf="openThemeConf" @close="openDrawer"></system-stting> -->
  </div>
</template>


<script src="./layout.js"></script>



<style lang='less' scoped>
.ht__layout-wrap{
  position: relative;
  overflow: hidden;
  height: 100%;
    & .layout {
      height: 100%;
    }
    & .ht__header{
      height: 50px;
      line-height: 50px;
      background: #fff;
      padding: 0 5px;
      position: relative;
      & .ht_logo{
        position: absolute;
        left: 15px;
        .logo{
          font-size: 35px;
          color:var(--themColor);
          vertical-align: middle;
        }
        .logo_name{
          color:var(--themColor);
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
      }
      & .title_icon{
          position: absolute;
        left: 175px;
        top: 16px;
      }
      & .title-item{
        position: absolute;
        right: 15px;
        img {
          width: 30px;
          border-radius: 20px;
        }
        & .long_name {
          font-size: 15px;
          color: var(--fontBaseColor);
        }
      }
      & .title-seach{
        width: 300px;
        position: absolute;
        top:8px;
        left: 250px;
      }
      & .ht_changeSys{
        position: absolute;
        right: 290px;
        color:var(--fontBaseColor);
        cursor: pointer;
        & .ht_division{
          display: inline-block;
          margin-left: 10px;
          color: var(--borderColor);
          font-size: 18px;
        }
      }
    }
    & .ht__content{
      flex-direction: row;
      height: calc(100% - 50px);
      & .layout__collapsible {
          box-shadow: 1px 1px 5px -5px rgb(36, 35, 35);
          background: unset;
          & .menuHeight {
            height: 100%;
          }
          & .ht_menu-collapsed{
            height: 100%;
            background: #000;
            & .mc_list{
              position: relative;
              text-align: center;
              padding: 15px 0;
              & .mc_icon{
                font-size: 25px;
                color: var(--fontColor);
              }
              & .mc_children-item{
                visibility: hidden;
                position: absolute;
                left: 50px;
                top: 15px;
                background-color: #111;
                z-index: 999;
                min-width: 150px;
                border: none;
                padding: 5px 0;
                border-radius: 2px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                transform: all .3s ease;
                text-align: left;
                .mc_children-li{
                  color: var(--fontColor);
                  cursor: pointer;
                  .mc_span{
                    display: inline-block;
                    width: 100%;
                    padding: 10px 0;
                    padding-left: 25px;
                  }
                  .menu_li_span{
                    display: inline-block;
                  }
                }
                .mc_hasChildren{
                    position: relative;
                    .mc_child-child-ul{
                      visibility: hidden;
                      position: absolute;
                      right: -150px;
                      width: 150px;
                      top: 0;
                      background: #fff;
                      border: none;
                      padding: 7px 0;
                      border-radius: 2px;
                      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    }
                }
                .mc_hasChildren:hover{
                  .mc_child-child-ul{
                    visibility: visible;
                  }
                }
                .mc_children-li:hover{
                  color: var(--themColor);
                }
                .mc_children-li-active{
                  color: var(--themColor);
                  border-right: 2px solid;

                }
              }
            }
            .mc_list:hover{
              & .mc_children-item{
                visibility: visible;
              }
            }
          }
        }
    }
    & .ht__router-view{
      padding:10px;
      background:#f5f5f5;
      height: 100%;
      display: flex;
      flex-direction: column;
     & .content_tag {
        // padding: 5px 10px;
        // max-width: calc(100% - 40px);
        display: -webkit-box;
        height: 30px;
        line-height: 28px;
        margin-bottom: 10px;
        & .tag_list {
          display: -webkit-box;
          overflow: hidden;
          width: calc(100% - 28px);
        }
        & .tag_box {
          height: 100%;
        }
        & .c_tag:first-child {
          margin: 0 2px 0 0;
        }
        & .c_tag {
          float: left;
          padding: 0px 10px;
          margin: 0 2px;
          font-size: 14px;
          border: 1px solid var(--noActiveColor);
          background: var(--noActiveBackColor);
          color: var(--fontBaseColor);
          cursor: pointer;
          position: relative;
          border-radius: 8px 8px 0 0;
          & span:nth-child(1) {
            display: inline-block;
            height: 10px;
            border-radius: 10px;
            background: var(--fontColor);
            vertical-align: middle;
          }
          & span:nth-child(2) {
            margin-right: 5px;
            font-size: 12px;
          }
          & i {
            font-size: 12px;
            vertical-align: baseline;
            transition: all 0.3s;
          }
          & i:hover {
            background: #b4bccc;
            border-radius: 12px;
            color: var(--fontColor);
          }
        }
        & .top_icon {
          font-size: 25px;
          color: #808695;
          margin-top: 3px;
        }
        & .tag_icon {
          background: #fff;
          border: 1px solid var(--borderColor);
          border-radius: 5px;
        }
        & .tag_icon-left {
          margin-right: 5px;
        }
        & .tag_icon-right {
          position: absolute;
          right: 40px;
        }
        & .ivu-dropdown {
          position: absolute;
          right: 10px;
          background: #fff;
          border: 1px solid var(--borderColor);
          border-radius: 5px;
        }
        & .c_tag__active {
          background:  linear-gradient(120deg,var(--themColor), var(--themColorT), var(--themColorS)) !important;
          color: var(--noActiveColor) !important;
          & span:nth-child(1) {
            background: var(--activeColor) !important;
            width: 10px;
          }
        }
      }
     & .system_view{
       overflow-y:auto;
       overflow-x: hidden;
       background: #fff;
       height: 100%;
     } 
    }

/*** 菜单自定义开始 */
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item{
  position: unset !important;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
// .ivu-menu,.ivu-menu-item{
//   font-size: 13px;
// }
.ivu-menu .ivu-menu-submenu{
  padding: 10px 0;
}
.ivu-menu-item,.ivu-menu-submenu{
  padding: 7px 0;
  cursor: pointer;
  color: var(--fontColor);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
  transform: translateX(20px);
}
.menu-item i {
  transform: translateX(20px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 20px;
}

.collapsed-menu  span {
  width: 0px;
  transition: width 0.2s ease;
  visibility: hidden;
}
.collapsed-menu i {
  transform: translateX(24px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 30px;
  margin: 10px 0;
}
.ivu-menu-light{
  background: #000;
}
.ivu-menu-vertical.ivu-menu-light:after{
    content: unset;
}
.ivu-menu-item-selected{
  background: unset;
  color: var(--themColor);
  border-right: 2px solid;
}

}

</style>