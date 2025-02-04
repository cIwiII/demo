
<!-- Tab菜单功能 -->
<template>
    <div class="box">
        <ul>
            <li
            v-for="item in $store.state.tabMenu"
            :key="item._id"
             :class="{active:item.active}">
                <router-link class="menu" :to="item.path">
                    <span>{{item.title}}</span>
                </router-link>
                <i @click="deleteTab(item._id)" class="el-icon-close"></i>
            </li>
        </ul>

        <!-- <router-link class="menu" to="/home/student">
            <span>学生列表</span
            ><i @click.stop="deleteTabs" class="el-icon-close"></i>
        </router-link>
        <router-link class="menu" to="/home">首页</router-link> -->
    </div>
</template>

<script>
export default {
    methods: {
        deleteTab(id) {
            this.$store.commit("deleteTabMenuData",id)
            const tabsMenu = this.$store.state.tabMenu
            const menu = tabsMenu[tabsMenu.length-1];
            this.$router.push({
                path:menu.path
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.box {
    ul {
        display: flex;
        list-style: none;
        padding: 0px;
        margin: 0px;
        text-align: center;
        li {
            width: 120px;
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            &.active {
                color: #fff;
                background-color: teal;
            }
            .menu {
                color: black;
                text-decoration: none;
                i {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>