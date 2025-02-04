<template>
    <div>
        <breadcrumb secondtitle="用户管理"></breadcrumb>
        <searchs @getSearchVal="getSearchVal" goto="/home/addAdmin"></searchs>

       <el-table :data="allUser" border style="width: 100%;">
            <el-table-column fixed prop="_id" label="用户编号" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="account" label="用户名" width="120" align='center'>
            </el-table-column>
            <el-table-column prop="realname" label="真实名" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="telephone" label="联系方式" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text"
                               size="small">查看</el-button> -->
                    <!-- <el-button type="text" size="small"
                               @click="$router.push('/home/clasPut?id='+scope.row._id)">
                        修改</el-button> -->
                    <el-button type="text" size="small"
                               @click="deleUser(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('userModule')

import searchs from '../../components/searchs.vue'
import breadcrumb from '../../components/breadcrumbs.vue'
export default {
    data() {
        return {
            searchVal: '',
        }
    },
    computed:{
        ...mapState(['allUser'])
    },
    methods: {
        ...mapActions(['getAllUser','deleAdmin']),
        getSearchVal(v) {
            this.searchVal = v
        },
        async deleUser(_id){
            let res=await this.deleAdmin(_id)
            if(res.data.code==200){
                alert('删除成功')
                this.getAllUser();
            }else{
                alert('删除失败')
            }
        },
    },
    components: {
        searchs, breadcrumb
    },
    created(){
        this.getAllUser();
    }
}
</script>

<style>
</style>