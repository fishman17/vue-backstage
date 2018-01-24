<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="header">
        <el-col :span="10" class="logo" :class="collapsed? 'logo-collapse-width':'logo-width'">
          {{collapsed? '':sysName}}
        </el-col>
        <el-col :span="10">
          <div class="tools" @click.prevent="collapse">
            <i class="fa fa-align-justify"></i>
          </div>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown  trigger="hover"  @click="handleClick">
              	<span class="userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-col>
      </el-col>
      <el-col :span="24" class="main">
            <!-- <el-menu default-active="2"
              class="el-menu-vertical-demo"
              :class="collapsed? 'menu-collapsed':'menu-expanded'"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
                <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
           </el-menu> -->
         
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
          <!--导航菜单-->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo-1" @open="handleopen" @close="handleclose" @select="handleselect"
            unique-opened router v-show="!collapsed">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>
          <!--导航菜单-折叠后-->
          <ul class="el-menu el-menu-vertical-demo-2 collapsed" v-show="collapsed" ref="menuCollapsed">
            <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
              <template v-if="!item.leaf">
                <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
                  <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                </ul>
              </template>
              <template v-else>
                <li class="el-submenu">
                  <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                </li>
              </template>
            </li>
          </ul>
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
              <!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                  {{ item.name }}
                </el-breadcrumb-item>
              </el-breadcrumb> -->
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      sysName: "VUEBACKGROUND",
      sysUserAvatar: "",
      sysUserName: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    test() {
      console.log(this.$router);
    },
    collapse() {
      this.collapsed = !this.collapsed;
    },
    handleClick() {},
    handleopen() {},
    handleclose() {},
    handleselect() {},
    logout() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user[0].name || "";
      this.sysUserAvatar = user[0].avatar || "";
    }
  }
};
</script>

<style  scoped lang="scss">
// @import '~scss_vars';
/* body {
  margin: 0;
  padding: 0;
  background-color: antiquewhite;
}
.header {
  height: 60px;
  line-height: 60px;
  background-color: aquamarine;
}
.logo {
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}
.logo-width {
  width: 230px;
}
.logo-collapse-width {
  width: 60px;
}
.tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}
.userinfo-inner {
  width: 200px;
  height: 100px;
  cursor: pointer;
  color: #fff;
}
.userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

.main {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}
.main .el-menu-vertical-demo {
  flex: 0 0 230px;
  width: 230px;
  height: 600px;
  color: black;
}
.main .el-menu-vertical-demo .collapsed {
  width: 60px;
}
.main .el-menu-vertical-demo .collapsed {
  width: 60px;
}
.main .el-menu-vertical-demo .menu-collapsed {
  flex: 0 0 60px;
  width: 60px;
}
.main .el-menu-vertical-demo .menu-expanded {
  flex: 0 0 230px;
  width: 230px;
} */
.container {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: seagreen;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu-vertical-demo-1{
        width: 230px;
      }
      .el-menu {
        height: 100%;
       background-color: #d5d8db;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
         
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
  
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
