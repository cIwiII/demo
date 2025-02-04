<template>
    <div>
        <breadcrumb secondtitle="轮播图修改"></breadcrumb>
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
                <img :src="oldImgPath" alt="" v-if="oldImgShow" />
            </el-form-item>
            <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>

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
            //
            swiperObj: {
                _id:'',
                goods_id: '',
                image_src: '',
                navigator_url:''
            },
            //添加失败时的图片名字
            errorImgPath:'',
            //控制原图显示
            oldImgShow:true,
            //临时存储原来图片的路径，成功上传后删除原图
            oldImgPath:''
        }
    },
    computed: {
        ...mapState(['allMenu','putSwiperObj']),
    },
    methods: {
        ...mapActions(['getAllMenu', 'updateSwiper','deleSwiperFile']),
        async onSubmit() {
            if (this.swiperObj.goods_id.length == 0) {
                alert('请选择要轮播的菜品')
                return
            }
            if (this.swiperObj.image_src.length == 0) {
                alert('请上传轮播图片')
                return
            }
            let newObj={}
            // newObj.navigator_url='/pagesB/detail/detail/index?goods_id='+this.swiperObj.goods_id
            newObj._id=this.swiperObj._id
            newObj.goods_id=this.swiperObj.goods_id
            newObj.image_src=this.swiperObj.image_src
            // console.log(newObj)
            let res=await this.updateSwiper(newObj)
            if(res.data.code!=200){//修改失败删图
                this.deleSwiperFile(this.errorImgPath)
                alert('修改失败')
            }else{// 修改成功，删除原图
                 this.deleSwiperFile(this.oldImgPath)
                 alert('修改成功')
                 this.$router.replace('/home/swiper')
            }
        },
        //图片对象存到data中
        upload(path) {
            console.log('路径被修改')
            //假如最终添加失败，取出名字删除图片，
            this.errorImgPath=path
            //隐藏原图
            this.oldImgShow=false
            
            const allPath = 'http://127.0.0.1:4001/images/' + path
            this.swiperObj.image_src = allPath;
        },
    },
    created() {
        console.log(this.putSwiperObj)
        this.swiperObj=this.putSwiperObj
        //临时存储
        this.oldImgPath=this.putSwiperObj.image_src
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