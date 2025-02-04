<template>
    <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{secondtitle}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:["secondtitle"]
}
</script>

<style lang="scss" scoped>
    .bread{
        padding-bottom: 3rem;
        border-bottom: 1px solid #c9c9c9;
        margin-bottom: 1.5rem;
    }

</style>