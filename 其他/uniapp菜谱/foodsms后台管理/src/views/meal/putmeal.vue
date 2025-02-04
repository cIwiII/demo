<template>
    <div>
        <breadcrumb secondtitle="菜品修改"></breadcrumb>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="套餐月份">
                <el-select v-model="form.mouth"
                           placeholder="请选择">
                    <el-option v-for="v in 12" :key="v" :label="v+'个月'"
                               :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="折后价格">
                <el-input v-model="form.salePrice"></el-input>
            </el-form-item>
            <el-form-item label="原价">
                <el-input v-model="form.normalPrice"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option label="不推荐" :value=0></el-option>
                    <el-option label="推荐" :value=1></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="套餐名字">
                <el-input v-model="form.name"></el-input>
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
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('mealModule')

export default {
    data() {
        return {
            form:{}
        }
    },
    computed: {
        ...mapState(['putMealObj']),
    },
    methods: {
        ...mapActions(['updateMeal']),
        async onSubmit() {
          let res=await this.updateMeal(this.form);
          if(res.data.meta.status==200){
                this.$router.replace('/home/meal')
            }
        },
    },
    created() {
        this.form = this.putMealObj
    },
    components: {
        breadcrumb
    },
}
</script>

<style>
</style>