<template>
    <div>
        <breadcrumb secondtitle="轮播图添加"></breadcrumb>
        <el-form ref="form" :model="swiperObj" label-width="80px">
            <el-form-item label="选择菜品">
                <el-select v-model="swiperObj.goods_id"
                           placeholder="请选择要添加轮播图的菜品">
                    <el-option v-for="v in allMenu" :key="v._id" :label="v.name"
                               :value="v._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片上传">
                <fileUpdata fileName="imgSrc" 
                action="http://127.0.0.1:4001/admin/fileUpload" 
                @onSuccess="upload"
                ></fileUpdata>
              
            </el-form-item>
            <el-form-item label="跳转的路由地址">
                <el-input v-model="swiperObj.navigator_url" disabled ></el-input>
            </el-form-item>
            <el-form-item label="跳转方式">
                <el-select v-model="swiperObj.open_type"
                           placeholder="请选择点击轮播图跳转的方式">
                    <el-option v-for="(v,index) in routerType" :key="index"
                               :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">立即添加</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import fileUpdata from '../../components/fileUpdata.vue'
import breadcrumb from '../../components/breadcrumbs.vue'
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('swiperModule')

export default {
    data() {
        return {
            swiperObj: {
                goods_id: '',
                image_src: '',
                navigator_url: '/pagesB/detail/detail/index',
                open_type: ''
            },
            //添加失败时的图片名字
            errorImgPath:'',
            //跳转方式数组
            routerType: ['navigate', 'redirect', 'switchTab', 'reLaunch', 'navigateBack', 'exit'],
        }
    },
    computed: {
        ...mapState(['allMenu']),
    },
    methods: {
        ...mapActions(['getAllMenu', 'addSwiper','deleSwiperFile']),
        async onSubmit() {
            if (this.swiperObj.goods_id.length == 0) {
                alert('请选择要轮播的菜品')
                return
            }
            if (this.swiperObj.image_src.length == 0) {
                alert('请上传轮播图片')
                return
            }
            if (this.swiperObj.open_type.length == 0) {
                alert('请选择点击轮播的跳转方式')
                return
            }
            let newObj=this.swiperObj
            newObj.navigator_url='/pagesB/detail/detail/index?goods_id='+this.swiperObj.goods_id
            console.log(newObj)
            let res=await this.addSwiper(newObj)
            if(res.data.code!=200){//添加失败删图
                alert('添加失败')
                this.deleSwiperFile(this.errorImgPath)

            }else{
                alert('添加成功')
                this.$router.replace('/home/swiper')
            }
        },
        //图片对象存到data中
        upload(path) {
            console.log('路径被修改')
            //假如最终添加失败，取出名字删除图片，
            this.errorImgPath=path
            const allPath = 'http://127.0.0.1:4001/images/' + path
            this.swiperObj.image_src = allPath;
        },
    },
    created() {
        //参数obj仓库已传可选{pageSize=12,currentPage=1}
        
        this.getAllMenu();
    },
    components: {
        breadcrumb,fileUpdata
    },
}
</script>

<style>
</style>