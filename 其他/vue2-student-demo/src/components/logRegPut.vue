<template>
    <el-dropdown @command="logOut">
        <span class="el-dropdown-link">
            用户管理<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="A">修改</el-dropdown-item>
            <el-dropdown-item divided command="B">注销</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    methods: {
        logOut(v) {
            if (v == 'B') {
                let yon = confirm('是否确认注销')
                if (yon) {
                    this.$router.replace('/home/login')
                    sessionStorage.clear()

                }
            } else if (v == 'A') {
                console.log('触发修改')
            }



        }
    }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #121314;
}
.el-icon-arrow-down {
    font-size: 16px;
}
</style>