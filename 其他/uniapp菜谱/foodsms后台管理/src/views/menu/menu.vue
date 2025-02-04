<template>
    <div>
        <breadcrumb secondtitle="菜谱管理"></breadcrumb>
        <searchs @getSearchVal="getSearchVal" goto=""></searchs>

        <el-table :data="allMenu" border style="width: 100%;">
            <el-table-column fixed prop="_id" label="编号" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120" align='center'>
            </el-table-column>
            <el-table-column prop="coverpic" label="缩略图" width="220"
                             align='center'>
                <!-- <img :src="coverpic" alt="" srcset=""> -->
                <template #default="scope">
                    <div style="display: flex; align-items: center;justify-content: center;">
                        <img :src="scope.row.coverpic"
                             style="width: 50px;height:50px">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="pageview" label="浏览量" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="collections" label="收藏量" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="isFree" label="是否免费" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="isHot" label="是否热点" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="isHot" label="原料" width="120" align='center'>
            </el-table-column>
            <el-table-column prop="isHot" label="制作步骤" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text"
                               size="small">查看</el-button> -->
                    <el-button type="text" size="small"
                               @click="$router.push('/home/updatameal?id='+scope.row._id)">
                        修改</el-button>
                    <!-- <el-button type="text" size="small"
                               @click="deleSwiper(scope.row._id)">删除
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('menuModule')

import searchs from '../../components/searchs.vue'
import breadcrumb from '../../components/breadcrumbs.vue'
export default {
    data() {
        return {
            searchVal: '',
        }
    },
    computed: {
        ...mapState(['allMenu'])
    },
    methods: {
        ...mapActions(['getAllMenu','searchMenu']),
        getSearchVal(v) {
            this.searchVal = v
            this.searchMenu(v)
        }
    },
    created() {
        //可选。默认{pageSize=12,currentPage=1}
        let obj={pageSize:20,currentPage:1}
        this.getAllMenu(obj)
    },
    components: {
        searchs, breadcrumb
    }
}
</script>

<style>

</style>