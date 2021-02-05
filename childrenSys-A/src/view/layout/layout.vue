
<template>
  <div class="ht__layout-wrap">
    <Layout class="layout">
      <Sider
        ref="sideHeader"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        class="layout__collapsible"
      >
        <div class="layout-logo">
          <span>{{systemCofig.systemName}}</span>
        </div>
        <Menu :active-name="menuDefaultActive" @on-select="openMenuItem" width="auto" :class="['menu-item',isCollapsed ? 'collapsed-menu' : '']">
            <template v-for="(item,index) in menu">
              <MenuItem :title="item.meta.title" :to="item.component" append :aaa="item.path" :name="item.path"  :key="index" v-if="item.children.length == 0">
                  <Icon :type="item.meta.icon"></Icon>
                  <span>{{item.meta.title}}</span>
              </MenuItem>
              <Submenu :title="item.meta.title" :name="item.path"  :key="index" v-else>
                <template  slot="title">
                    <Icon :type="item.meta.icon"></Icon>
                    <span>{{item.meta.title}}</span>
                </template>
                <!-- 二级菜单 -->
                <!-- <MenuItem :to="key.component" append :name="key.name" :key="i" v-for="(key,i) in item.children"><span>{{key.meta.title}}</span></MenuItem> -->
                <!-- 三级菜单 -->
                <template v-for="(key,i) in item.children">
                  <MenuItem :title="key.meta.title" :to="key.component" :aaa="key.path" append :name="key.path" :key="i" v-if="!key.children"><span>{{key.meta.title}}</span></MenuItem>
                  <Submenu :title="key.meta.title" :name="key.path" :key="i" v-else>
                    <template  slot="title">
                        <span :title="key.meta.title">{{key.meta.title}}</span>
                    </template>
                    <MenuItem :title="m.meta.title" :to="m.component" :aaa="m.path" append :name="m.path" :key="n" v-for="(m,n) in key.children"><span>{{m.meta.title}}</span></MenuItem>
                  </Submenu>
                </template>
              </Submenu>
            </template>
        </Menu>
      </Sider>
      <Layout class="ht__layout-content">
        <Header>
          <Icon
            @click.native="collapsedSider"
            type="md-menu"
            :class="['title_icon',isCollapsed?'rotate-icon':'']"
            :style="{margin: '0 20px'}" size="24"
          ></Icon>
          <div class="content-title">
            <Dropdown class="tit-item user__item" @on-click="selectItem">
              <img src="../../assets/img/header.gif" />
              <span class="long_name">{{getUserData.nickName}}</span>
              <DropdownMenu slot="list">
                <DropdownItem name="user">
                  <Icon type="ios-contact" />个人中心
                </DropdownItem>
                <DropdownItem name="singOut" divided>
                  <Icon type="ios-log-out" />退出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Icon type="md-more" class="tit-item user__item tit-icon" @click="openDrawer" />
          </div>
        </Header>
        <div class="content_tag">
          <div class="tag_icon-left tag_icon" v-show="showIcon" @click="ckLeft">
            <Icon type="ios-arrow-back top_icon" />
          </div>
          <div class="tag_list">
            <div
              :class="['c_tag',index == 0 ? 'c_tag__active':'']"
              v-for="(item,index) in tag"
              :key="index"
              @click.stop="checked(index,$event)"
              :index="index"
              :to="item.path" 
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
        <Content class="ht__router-view" id="ht__router-view">
          <keep-alive><router-view /></keep-alive>
        </Content>
        <Footer
          class="layout-footer-center"
        >© 2015-2019 All Rights Reserved. 海拓时代 http://www.hitalkers.com</Footer>
      </Layout>
    </Layout>
    <system-stting :openThemeConf="openThemeConf" @close="openDrawer"></system-stting>
  </div>
</template>


<script src="./layout"></script>



<style lang='less' scoped>
.ht__layout-wrap {
  position: relative;
  overflow: hidden;
  height: 100%;
  // background: url('../../../public/images/ocean.jpg');
  & .layout {
    height: 100%;
    & .ivu-layout-header {
      background: #fff;
      padding: 0 10px;
    }
  }
}
.ht__layout-content {
  .rotate-icon{
    transform: rotate(-90deg);
  }
  & .title_icon {
    color: var(--fontColor);
    float: left;
    line-height: 64px;
    margin-right: 15px;
    font-size: 20px;
    transition: all .3s;
  }
  & .content_bread {
    font-size: 13px;
    color: hsla(0, 0%, 100%, 0.7);
    float: left;
  }
  & .content-title {
    float: right;
    height: 64px;
    line-height: 64px;
    color: var(--fontColor);
    display: flex;
    & .tit-item {
      padding: 0 10px;
      cursor: pointer;
    }
    & .user__item:hover {
      background: hsla(0, 0%, 100%, 0.2);
    }
    & .tit-item img {
      width: 40px;
      border-radius: 20px;
    }
    & .tit-icon {
      font-size: 20px;
      padding: 0;
      line-height: 64px;
    }
    & .long_name {
      font-family: "楷体";
      font-size: 15px;
      font-weight: bold;
      margin-left: 5px;
      color: var(--fontColor);
    }
    & .plat_icon {
      position: relative;
      display: flex;
      flex-direction: column;
    }
    & .plat_icon i {
      font-size: 20px;
      margin-top: 15px;
    }
    & .plat_span {
      font-family: -webkit-pictograph;
      font-size: 12px;
      line-height: 22px;
    }
  }
  & .content_tag {
    float: left;
    padding: 5px 10px;
    // max-width: calc(100% - 40px);
    display: -webkit-box;
    height: 43px;
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
      padding: 5px 10px;
      margin: 0 2px;
      font-size: 14px;
      border: 1px solid var(--borderColor);
      background: var(--noActiveBackColor);
      color: var(--noActiveFontColor);
      cursor: pointer;
      position: relative;
      & span:nth-child(1) {
        display: inline-block;
        height: 10px;
        border-radius: 10px;
        background: var(--activeElColor);
        vertical-align: baseline;
        margin-right: 5px;
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
  }
  & .layout-footer-center {
    background: #f5f7f9;
    padding: 10px 50px;
    color: #515a6e;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
  }
}
.tag_icon-close i {
  font-size: 17px;
}

.c_tag__active {
  background: var(--acitveBackColor) !important;
  color: var(--themColor) !important;
  & span:nth-child(1) {
    width: 10px;
  }
}

.layout__collapsible {
  box-shadow: 1px 1px 5px 1px var(--borderColorShadow);
  background: unset;
  & .menuHeight {
    height: 100%;
  }
}
.ivu-breadcrumb > span:last-child {
  color: var(--fontColor);
}
.ht__router-view {
  padding: 0 10px;
  height: calc(100% - 141px);
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
    height: calc(100% - 64px);
}
.ivu-menu-item,.ivu-menu-submenu{
  padding: 10px 0;
  cursor: pointer;
  color: #515a6e;
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
  font-size: 23px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
    // visibility: hidden;
}
.collapsed-menu i {
  transform: translateX(24px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 30px;
  margin: 10px 0;
}

.ivu-menu-vertical.ivu-menu-light:after{
    content: unset;
}
.ivu-menu-item-selected{
    background: #ecf5ff;
    color: #409EFF;
}


/*** 菜单自定义结束 */
.layout-logo {
  width: 100%;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid var(--borderColor);
  text-align: center;
  line-height: 64px;
  font-size: 18px;
}

</style>