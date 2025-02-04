<template>
    <div>
        <breadcrumb secondtitle="轮播图管理"></breadcrumb>
        <searchs @getSearchVal="getSearchVal" goto="/home/addSwiper"></searchs>

        <el-table :data="allSwiper" border style="width: 100%;">
            <el-table-column fixed prop="_id" label="编号" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="goods_id" label="商品id" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="image_src" label="图片" align='center'>
                <template #default="scope">
                    <div
                         style="display: flex; align-items: center;justify-content: center;">
                        <img :src="scope.row.image_src"
                             style="width: 50px;height:50px">
                    </div>
                </template>
                <!-- <img :src="image_src" alt="" srcset="" /> -->
            </el-table-column>
            <el-table-column prop="navigator_url" label="导航地址" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column prop="open_type" label="打开方式" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'
                             width="220">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text"
                               size="small">查看</el-button> -->
                    <el-button type="text" size="small"
                               @click="putswiper(scope.row)">
                        修改</el-button>
                    <el-button type="text" size="small"
                               @click="deleteSwiper(scope.row._id)">删除
                    </el-button>
                    <el-button type="text" size="small"
                               @click="sxgSwiper(scope.row._id)">
                        <div v-if="scope.row.show==1" class="xj">下架</div>
                        <div v-else class="sj">上架</div>
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('swiperModule')

import searchs from '../../components/searchs.vue'
import breadcrumb from '../../components/breadcrumbs.vue'
export default {
    data() {
        return {
            // searchVal: '',
        }
    },
    computed: {
        ...mapState(['allSwiper'])
    },
    methods: {
        ...mapActions(['getAllSwiper', 'deleSwiper', 'updateSwiperShow','findSwiper']),
        ...mapMutations(['changePutSwiperObj','changeSearchVal']),
        //查询
        getSearchVal(v) {
            // this.searchVal = v
            this.changeSearchVal(v)
            this.findSwiper(v)
        },
        async deleteSwiper(_id) {
            let res = await this.deleSwiper(_id)
            if (res.data.code == 200) {
              alert('删除成功')
                this.getAllSwiper()//更新数据
            }else{
              alert('删除失败')
            }

        },
        //上下架
        async sxgSwiper(_id) {
            let res = await this.updateSwiperShow(_id)
            if (res.data.code == 200) {
                this.getAllSwiper()//更新数据
            }

        },
        //修改
        putswiper(obj) {
            this.changePutSwiperObj(obj)
            this.$router.push('/home/putSwiper')
        }
    },
    created() {
        this.getAllSwiper()
    },
    components: {
        searchs, breadcrumb
    }
}
</script>

<style lang="scss" scoped>
.sj,
.xj {
    padding: 1rem 2rem;
    border-radius: 5px;
    color: black;
}
.xj {
    background-color: rgba(143, 221, 69, 0.719);
}
.sj {
    background-color: rgba(231, 87, 77, 0.575);
}
</style>