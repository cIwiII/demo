<template>
    <div class="search">
        <el-input v-model="inputval" placeholder="请输入内容"></el-input>
        <button v-on:click="search" class="sear">搜索</button>
        <router-link :to="goto" class="add">添加</router-link>
    </div>
</template>

<script>
export default {
    props: ['goto'],
    data() {
        return {
            inputval: '',
        }
    },
    methods: {
        search() {
            this.$emit('getSearchVal', this.inputval)
        }
    }
}
</script>
<style lang="scss" scoped>
.search {
    width: 50rem;
    display: flex;
    height: 40px;
    margin-bottom: 2rem;
    .sear,.add {
        width: 10rem;
        padding: 0 2rem;
        margin-left: 1rem;
        border: 0;
        border-radius: 0.4rem;
        background-color: #5b9cf9;
        color: #fff;
    }
    .add{
        width: 5rem;
         border-radius: 0.4rem;
        background-color: #5b9cf9;
        line-height: 40px;
            color: #fff;
            padding: 0 2rem;
            text-decoration: none;
    }
        
    
}
</style>