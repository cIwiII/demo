<template>
    <el-container id="home">
        <el-aside width="200px" class="ul">
          
                <el-menu :default-active="currentTag"
                         class="el-menu-vertical-demo" @open="handleOpen"
                         @close="handleClose" :router='true'
                         :unique-opened='true'>
                    <template v-for="v in navList">
                        <el-menu-item :index="v.path" v-if="!v.children"
                                      @click="jour(v.title,v.path)" :key="v.id">
                            <i :class="v.icon"></i>
                            <span slot="title">{{v.title}}</span>
                        </el-menu-item>
                        <!-- v-else 暂无 -->
                        <el-submenu :index="v.path" v-else :key="v.id">
                            <template slot="title">
                                <i :class="v.icon"></i>
                                <span>{{v.title}}</span>
                            </template>
                            <el-menu-item :index="item.path"
                                          v-for="item in v.children"
                                          @click="jour(item.title,item.path)"
                                          :key="item.id">
                                <i :class="item.icon"></i>
                                <span>{{item.title}}</span>
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            
        </el-aside>
        <el-container>
            <el-header class="header">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <!-- <img src="../../src/assets/logo-250px.png" alt /> -->
                    </el-col>
                    <el-col :span="16">
                        <div class="headNav">
                            <!-- <el-tabs v-model="editableTabsValue" type="card"
                                     closable @tab-remove="removeTab"
                                     @tab-click="activeTab">
                                <el-tab-pane v-for="item in $store.state.headNavArr"
                                             :key="item.path"
                                             :label="item.pathName"
                                             :name="item.path">
                                </el-tab-pane>
                            </el-tabs> -->
                        </div>
                    </el-col>
                    <el-col :span="4" class="logre">
                        <span>欢迎用户：{{userInfo.realname}}</span>
                        <!-- <logRegPut></logRegPut> -->
                    </el-col>
                </el-row>

            </el-header>
            <el-main id="text">
                    <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
// import logRegPut from '../components/logRegPut.vue'

import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('userModule')
export default {
    components: {
        // logRegPut,
    },
    data() {
        return {
            
            editableTabsValue: '/home',
            currentTag: '/home',//菜单属性：default-active
            navList: [
                { id: 1, title: '首页', path: '/home', icon: 'el-icon-menu'},
                {
                    id: 2, title: '用户管理', path: '/home/user', icon: 'el-icon-location'
                    // , children: [
                    //     { id: 21, title: '学生列表', path: '/home/stums', icon: 'el-icon-document', auth: [1, 2, 0] },
                    //     { id: 22, title: '添加学生', path: '/home/add', icon: 'el-icon-setting', auth: [1] },
                    // ]
                },
                {
                    id: 3, title: '轮播图管理', path: '/home/swiper', icon: 'el-icon-menu'
                    // , children: [
                    //     { id: 31, title: '班级列表', path: '/home/clams', icon: 'el-icon-menu', auth: [1, 2, 0] },
                    //     { id: 32, title: '添加班级', path: '/home/addClas', icon: 'el-icon-menu', auth: [1] },
                    // ]
                },
                {
                    id: 4, title: '菜谱管理', path: '/home/menu', icon: 'el-icon-menu'
                    // , children: [
                    //     { id: 41, title: '班主任列表', path: '/home/tecms', icon: 'el-icon-menu', auth: [1, 2, 0] },
                    //     { id: 42, title: '添加班主任', path: '/home/addTe', icon: 'el-icon-menu', auth: [1] },
                    // ]
                },
                { id: 5, title: '会员管理', path: '/home/vip', icon: 'el-icon-menu'},
                { id: 6, title: '套餐管理', path: '/home/meal', icon: 'el-icon-menu'}
              

            ]
        }
    },
    computed: {
        ...mapState(['userInfo']),
        // newNavList() {
        //     let array = [];
        //     //取出用户权限等级-
        //     // console.log('权限', this.userInfo.auth)
        //     const auth = this.userInfo.auth
        //     this.navList.forEach(v => {
        //         //判断是否有二级菜单且二级菜单不为空
        //         if (v.children && v.children.length > 0) {
        //             let menu = { ...v, children: [] }
        //             //遍历二级菜单v.children
        //             v.children.forEach(val => {
        //                 if (val.auth.includes(auth)) {
        //                     menu.children.push(val)
        //                 }
        //             })
        //             //判断添加后的二级菜单是否为空，不为空添加一级和二级，
        //             // 否则包括一级菜单页不添加
        //             if (menu.children.length > 0) {
        //                 array.push(menu)
        //             }
        //         }
        //         //只有一级菜单，直接添加
        //         else {
        //             if (v.auth.includes(auth)) {
        //                 array.push(v)
        //             }
        //         }
        //     })
        //     // console.log(array)
        //     return array
        // },

    },
    methods: {
        // ...mapActions(['getUserInfo']),
        //一级菜单点击事件
        jour(pathName, path) {
            // let name = sessionStorage.getItem('username')
            // this.$store.commit('jour', { name, pathName, time: this.$http.time.timePut(Date()) })
            // this.editableTabsValue = path
            // this.$store.commit('headPush', { name, pathName, path })

        },
        //右侧菜单列表方法2个
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        // removeTab(targetName) {
        //     this.$store.commit('headRemove', targetName)
        //     // this.$router.back();
        //     this.editableTabsValue = this.$route.path

        // },
        // activeTab(v) {
        //     // console.log('选中',v.index-1)
        //     this.$router.push(v.name)
        // }
    },
    

}
</script>
<style lang="scss" scoped>
#home {
    width: 1200px;
    margin: 0 auto;
    background-color: #efefef;
    .ul {
        overflow: hidden;
        height: 100vh;
        background-color: #2f2e4d;
        // overflow-y: scroll;
        .el-menu-vertical-demo{
            background-color: #2f2e4d;
            .el-menu-item{
                color: #fff;
            }
            .el-menu-item:focus{
                background-color: #4a68d9;
            }
            .el-menu-item:hover{
                background-color: #4a68d9;
            }
        }
    }
    header {
        width: 100%;
        height: 120px;
        background-color:#fff;
        text-align: left;
        .el-row {
            .el-col {
                border-radius: 4px;
                padding-top: 20px;
                .headNav {
                    margin-top: -20px;
                    overflow: hidden;
                    // height: 20px;
                    .el-tabs__header {
                        margin: 0;
                    }
                }
                img {
                    width: 160px;
                    margin-top: -10px;
                    padding-left: 20px;
                }
            }
            // .bg-purple-dark {
            //     background: #99a9bf;
            // }
            // .bg-purple-light {
            //     background: #e5e9f2;
            // }
            // .row-bg {
            //     padding: 10px 0;
            //     background-color: #f9fafc;
            // }
        }
    }
    
    #text {
        margin: 20px 0 0 20px;
        background-color: #fff;
        height: calc(100vh - 82px);
        overflow: hidden;
        overflow-y: scroll;
    }
}
</style>