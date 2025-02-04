/* 

 */

<template>
    <div class="group">
        <el-upload :action='action'
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :name='fileName'
                   :on-success='success'
                   :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex"
const { mapActions } = createNamespacedHelpers('swiperModule')
export default {
    // file代表告诉后端。取文件用file来获取:headers='header'
    props: ["fileName", "action"],
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    // computed:{
    //   header(){
    //     return sessionStorage.getItem('token')
    //   }
    // },
    methods: {
      ...mapActions(['deleSwiperFile']),
      //参数移除的文件、列表中的文件数组
      handleRemove(file, fileList) {
        console.log('移除',file);
        if(file.response.code==200){
          this.deleSwiperFile(file.response.data)
        }
      },
      //点击图片放大时调用
      handlePictureCardPreview(file) {
        console.log('文件对象',file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      success(response, file, fileList){
        console.log('文件成功',file)
           this.$emit('onSuccess',response.data)
      }
    }
}
</script>
<style lang="scss" scoped>
</style>