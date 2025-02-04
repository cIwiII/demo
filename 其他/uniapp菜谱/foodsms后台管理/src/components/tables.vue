<template>
    <el-table
    :data="tbodyData"
    stripe
    style="width: 100%">
    <template v-for="v in th">
    <el-table-column
    :key="v.id"
      :prop="v.td"
      :label="v"
      :width="v.width">
    </el-table-column>
    </template>
  </el-table>
</template>

<script>

export default {
  props:['tbodyData','th'],
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
}
</script>

<style>

</style>