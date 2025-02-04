<template>
    <div id="home">
        <div class="header">
            <div>
                <div class="login">
                    <img src="../../src/assets/logo-250px.png" alt />
                </div>
                <!-- <nav>
                    <router-link to="/">主页</router-link>|
                    <router-link to="/login">登录</router-link>|
                    <router-link to="/reg">注册</router-link>
                </nav> -->
            </div>

        </div>
        <div class="hocontent">
            <ul>
                <li v-for="v in navs" :key="v.id"
                    v-bind:class="{ren:v.check==currentTag}"
                    @click="currentTag=v.check">
                    <router-link :to="v.check">{{v.title}}</router-link>
                </li>
            </ul>
            <div id="text">
                <!-- 二级路由渲染出口 <router-view/>-->
                <router-view :parThArr="parThArr" />
            </div>
        </div>
        <div class="footer">尾部</div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            navs: [
                { id: 1, title: '首页', status: false, check: '/home' },
                { id: 2, title: '学生管理', status: false, check: '/home/stums' },
                { id: 3, title: '班级管理', status: false, check: '/home/clams' },
                { id: 4, title: '教师管理', status: false, check: '/home/tecms' }
            ],
            currentTag: '/home',
            //表头
            parThArr: [
                { id: 1, title: '学生姓名', status: false },
                { id: 2, title: '学生年龄', status: false },
                { id: 3, title: '学生班级', status: false },
                { id: 4, title: '学生学科', status: false },
                { id: 5, title: '学生性别', status: false },
                { id: 6, title: '学生头像', status: false },
                { id: 7, title: '操作', status: false },
            ]
        }
    },
    created() {
        // console.log(this.$route);
        this.currentTag = this.$route.path
    },
    computed: {
    },
    watch: {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
#home {
    width: 1200px;
    margin: 0 auto;
    background-color: cadetblue;
    .header {
        width: 100%;
        height: 40px;
        background-color: rgb(180, 192, 202);
        > div {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .login img {
                margin: 5px 0 0 20px;
                width: 130px;
            }
            nav {
                padding: 10px 30px;
                a {
                    font-weight: bold;
                    color: #fff;

                    &.router-link-exact-active {
                        color: #42b983;
                    }
                }
            }
        }
    }
    .hocontent {
        display: flex;
        > ul {
            width: 20%;
            list-style: none;
            // padding-right: 30px;
            li {
                line-height: 2;
                a {
                    // color: #fff;
                    display: block;
                    text-decoration: none;
                }
            }
            .ren {
                color: #fff;
                background-color: darkmagenta;
            }
        }
        #text {
            width: 80%;
            background-color: rgb(248, 248, 248);
            height: calc(100vh - 60px);
            overflow: hidden;
            overflow-y: scroll;
            // div {
            //     height: 1200px;
            // }
        }
    }
    .footer {
        width: 100%;
        height: 20px;
        background-color: rgb(180, 192, 202);
    }
}
</style>
