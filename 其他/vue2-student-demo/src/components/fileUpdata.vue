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
export default {
    // file代表告诉后端。取文件用file来获取
    props: ["fileName", "action"],
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      success(response, file, fileList){
            this.$emit('onSuccess',response.data[0])
      }
    }
}
</script>
<style lang="scss" scoped>
</style>