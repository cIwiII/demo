<template>
    <div>
        <breadcrumb secondtitle="会员管理"></breadcrumb>
        <searchs @getSearchVal="getSearchVal" goto="/home/addAdmin"></searchs>

        <el-table :data="allVip" border style="width: 100%;">
            <el-table-column fixed prop="_id" label="用户编号" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="nickName" label="用户名" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="avatarUrl" label="头像" width="220"
                             align='center'>
                <template #default="scope">
                    <div
                         style="display: flex; align-items: center;justify-content: center;">
                        <img :src="scope.row.avatarUrl"
                             style="width: 50px;height:50px">
                    </div>
                </template>
                <!-- <img :src="image_src" alt="" srcset="" /> -->
            </el-table-column>
            <el-table-column prop="province" label="住址" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="vipdate" label="vip截至时间" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button type="text" size="small"
                               @click="topUpVip(scope.row._id)">充值会员

                    </el-button>
                    <el-button type="text" size="small"
                               @click="canlVip(scope.row._id)">
                        取消会员</el-button>
                    <el-button type="text" size="small"
                               @click="deleteVip(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('vipModule')

import searchs from '../../components/searchs.vue'
import breadcrumb from '../../components/breadcrumbs.vue'
export default {
    data() {
        return {
            searchVal: '',
        }
    },
    computed: {
        ...mapState(['allVip'])
    },
    methods: {
        ...mapActions(['getAllVip', 'ToVip', 'cancleVip', 'deleVip']),
        getSearchVal(v) {
            console.log(v);
            this.searchVal = v
        },
        //{_id:1,date:"2021-08-31"},大于当前时间
        async topUpVip(_id) {
            console.log('充值会员')
            let obj = { _id, date: "2022-08-31" }
            let res = await this.ToVip(obj)
            if (res.data.meta.status == 200) {
                this.getAllVip()
            }
        },
        async canlVip(_id) {
            console.log('取消会员')
            let res = await this.cancleVip(_id);
            if (res.data.meta.status == 200) {
                this.getAllVip()
            }
        },
        async deleteVip(_id) {
            console.log('删除会员')
            let res = await this.deleVip(_id);
            if (res.data.meta.status == 200) {
                this.getAllVip()
            }

        }
    },
    created() {
        this.getAllVip()
    },
    components: {
        searchs, breadcrumb
    }
}
</script>

<style>
</style>