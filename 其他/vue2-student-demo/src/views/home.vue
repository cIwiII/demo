<template>
    <div id="home">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="4">
                    <img src="../../src/assets/logo-250px.png" alt />
                </el-col>
                <el-col :span="16">
                    <div class="headNav">
                        <el-tabs v-model="editableTabsValue" type="card"
                                 closable @tab-remove="removeTab"
                                 @tab-click="activeTab">
                            <el-tab-pane v-for="item in $store.state.headNavArr"
                                         :key="item.path" :label="item.pathName"
                                         :name="item.path">
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :span="4" class="logre">
                    <span>欢迎{{userInfo.username}}登录</span>
                    <logRegPut></logRegPut>
                </el-col>
            </el-row>

        </el-header>
        <el-row class="tac">
            <el-col :span="4" class="ul">
                <el-menu :default-active="currentTag"
                         class="el-menu-vertical-demo" @open="handleOpen"
                         @close="handleClose" :router='true'
                         :unique-opened='true'>
                    <template v-for="v in newNavList">
                        <el-menu-item :index="v.path" v-if="!v.children"
                                      @click="jour(v.title,v.path)" :key="v.id">
                            <i :class="v.icon"></i>
                            <span slot="title">{{v.title}}</span>
                        </el-menu-item>
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
            </el-col>
            <el-col :span="20" id="text">
                <router-view></router-view>
            </el-col>

        </el-row>
        <footer>尾部</footer>
    </div>
</template>
<script>
import logRegPut from '../components/logRegPut.vue'
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('userInfoModul')
export default {
    components: {
        logRegPut,
    },
    data() {
        return {

            editableTabsValue: '/home',
            currentTag: '/home',
            navList: [
                { id: 1, title: '首页', path: '/home', icon: 'el-icon-menu', auth: [1, 2, 0] },
                {
                    id: 2, title: '学生管理', path: '/home/stu', icon: 'el-icon-location', children: [
                        { id: 21, title: '学生列表', path: '/home/stums', icon: 'el-icon-document', auth: [1, 2, 0] },
                        { id: 22, title: '添加学生', path: '/home/add', icon: 'el-icon-setting', auth: [1] },
                    ]
                },
                {
                    id: 3, title: '班级管理', path: '/home/cla', icon: 'el-icon-menu', children: [
                        { id: 31, title: '班级列表', path: '/home/clams', icon: 'el-icon-menu', auth: [1, 2, 0] },
                        { id: 32, title: '添加班级', path: '/home/addClas', icon: 'el-icon-menu', auth: [1] },
                    ]
                },
                {
                    id: 4, title: '班主任管理', path: '/home/teac', icon: 'el-icon-menu', children: [
                        { id: 41, title: '班主任列表', path: '/home/tecms', icon: 'el-icon-menu', auth: [1, 2, 0] },
                        { id: 42, title: '添加班主任', path: '/home/addTe', icon: 'el-icon-menu', auth: [1] },
                    ]
                },
                { id: 5, title: '数据统计', path: '/home/data', icon: 'el-icon-menu', auth: [1, 2, 0] },
                { id: 6, title: '日志统计', path: '/home/journal', icon: 'el-icon-menu', auth: [1, 2, 0] },
                { id: 7, title: '员工管理', path: '/home/staff', icon: 'el-icon-menu', auth: [1, 2, 0] },

            ]
        }
    },
    computed: {
        ...mapState(['userInfo']),
        newNavList() {
            let array = [];
            //取出用户权限等级-
            // console.log('权限', this.userInfo.auth)
            const auth = this.userInfo.auth
            this.navList.forEach(v => {
                //判断是否有二级菜单且二级菜单不为空
                if (v.children && v.children.length > 0) {
                    let menu = { ...v, children: [] }
                    //遍历二级菜单v.children
                    v.children.forEach(val => {
                        if (val.auth.includes(auth)) {
                            menu.children.push(val)
                        }
                    })
                    //判断添加后的二级菜单是否为空，不为空添加一级和二级，
                    // 否则包括一级菜单页不添加
                    if (menu.children.length > 0) {
                        array.push(menu)
                    }
                }
                //只有一级菜单，直接添加
                else {
                    if (v.auth.includes(auth)) {
                        array.push(v)
                    }
                }
            })
            // console.log(array)
            return array
        },

    },
    methods: {
        // ...mapActions(['getUserInfo']),
        jour(pathName, path) {
            let name = sessionStorage.getItem('username')
            this.$store.commit('jour', { name, pathName, time: this.$http.time.timePut(Date()) })
            this.editableTabsValue = path
            this.$store.commit('headPush', { name, pathName, path })

        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        removeTab(targetName) {
            this.$store.commit('headRemove', targetName)
            // this.$router.back();
            this.editableTabsValue = this.$route.path

        },
        activeTab(v) {
            // console.log('选中',v.index-1)
            this.$router.push(v.name)
        }
    },

}
</script>
<style lang="scss" scoped>
#home {
    width: 1200px;
    margin: 0 auto;
    background-color: rgba(159, 164, 164, 0.366);
    header {
        width: 100%;
        height: 40px;
        background-color: rgb(180, 192, 202);
        text-align: left;
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
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
            .bg-purple-dark {
                background: #99a9bf;
            }
            .bg-purple-light {
                background: #e5e9f2;
            }
            .row-bg {
                padding: 10px 0;
                background-color: #f9fafc;
            }
        }
    }
    .ul {
        overflow: hidden;
        // height: 300px;
        height: calc(100vh - 82px);
        background-color: #fff;
        overflow-y: scroll;
    }
    #text {
        width: calc(100% - 200px);
        background-color: rgb(248, 248, 248);
        height: calc(100vh - 82px);
        overflow: hidden;
        overflow-y: scroll;
    }
    footer {
        width: 100%;
        height: 20px;
        background-color: rgb(180, 192, 202);
    }
}
</style>