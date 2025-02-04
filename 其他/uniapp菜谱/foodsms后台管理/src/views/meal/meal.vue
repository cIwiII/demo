<template>
  <div>
    <breadcrumb secondtitle="套餐管理"></breadcrumb>
    <searchs @getSearchVal="getSearchVal" goto="/home/addmeal"></searchs>
    
     <el-table :data="allMeal" border style="width: 100%;">
            <el-table-column fixed prop="_id" label="套餐编号" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120" align='center'>
            </el-table-column>
            <el-table-column prop="normalPrice" label="价格" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="salePrice" label="打折价格" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text"
                               size="small">查看</el-button> -->
                    <el-button type="text" size="small"
                               @click="putMeal(scope.row)">
                        修改</el-button>
                    <el-button type="text" size="small"
                               @click="deleteMeal(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState,mapMutations } = createNamespacedHelpers('mealModule')

import searchs from '../../components/searchs.vue'
import breadcrumb from '../../components/breadcrumbs.vue'
export default {
     data(){
        return {
            searchVal:'',
        }
    },
    computed:{
...mapState(['allMeal']),
    },
    methods:{
      ...mapActions(['getAllMeal','deleMeal']),
      ...mapMutations(['changePutMealObj']),
        getSearchVal(v){
            this.searchVal=v
        },
        async deleteMeal(_id){
          console.log('套餐删除_id',_id)
          let res=await this.deleMeal(_id)
          if(res.data.meta.status==200){
            this.getAllMeal()
            alert('删除成功')
          }else{
            alert('删除失败')
          }
        },
        putMeal(obj){
          this.changePutMealObj(obj);
          console.log('套餐对象修改');
          this.$router.push('/home/putmeal')
        }
    },
    created(){
      this.getAllMeal()
    },
components:{
      searchs,breadcrumb
    }
}
</script>

<style>

</style>