<template>
    <div class="pageing">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>·
    </div>
</template>

<script>
export default {
    props: ["total",'pageSize','currentPage'],
    data() {
        return {
        }
    },
    methods: {
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
             
            this.$emit('changeSize',val)
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
           
            this.$emit("changePage", val)
        },
    },




}
</script>

<style lang="scss" scoped>
.pageing {
    display: flex;
    margin-top: 20px;
    align-items: center;
    .pages {
        display: flex;
        a {
            display: block;
            width: 30px;
            height: 30px;
            border: 1px solid gainsboro;
            text-align: center;
            line-height: 30px;
        }
    }
}
</style>