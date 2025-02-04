<template>
    <div>
        <breadcrumb secondtitle="菜品修改"></breadcrumb>
        <el-form ref="form" :model="menuObj" label-width="80px">
            <el-form-item label="是否免费观看">
                <el-select v-model="menuObj.isFree" placeholder="请选择">
                    <el-option label="会员观看" value="N"></el-option>
                    <el-option label="免费观看" value="Y"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否是热点商品">
                <el-select v-model="menuObj.isHot" placeholder="请选择">
                    <el-option label="普通商品" value="N"></el-option>
                    <el-option label="热点商品" value="Y"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜品名字">
                <el-input v-model="menuObj.name" placeholder="请输入菜品名字">
                </el-input>
            </el-form-item>
            <el-form-item label="菜品的时间">
                <el-input v-model="menuObj.needtime" placeholder="请输入菜品的时间">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumbs.vue'
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('menuModule')

export default {
    data() {
        return {
            menuObj: { _id: '', isFree: '', isHot: '', name: '', needtime: '' }
        }
    },
    computed: {
        ...mapState(['stoMenuObj']),
    },
    methods: {
        ...mapActions(['menuDetail', 'updateMenu']),
        ...mapMutations(['changeMenuObj']),
        async onSubmit() {
            let res=await this.updateMenu(this.menuObj)
            if(res.data.meta.status==200){
                alert('修改成功')
                this.$router.replace('/home/menu')
            }else{
                alert('修改失败')
            }
        },
        //获取对象
        async getObj() {
            const id = this.$route.query.id
            console.log(id);
            let res = await this.menuDetail(id)
        }
    },
    created() {
        this.getObj();
        this.menuObj = this.stoMenuObj
    },
    components: {
        breadcrumb
    },
}
</script>

<style>
</style>