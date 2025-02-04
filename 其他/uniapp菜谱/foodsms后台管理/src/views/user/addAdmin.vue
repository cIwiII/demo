<template>
<div>
    <breadcrumb secondtitle="用户添加"></breadcrumb>
        <el-form ref="form" :model="addObj" label-width="80px">
  <el-form-item label="账户名称">
    <el-input v-model="addObj.account" placeholder="请输入至少4为字符"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="addObj.password" placeholder="请输入至少4为字符"></el-input>
  </el-form-item>
  <el-form-item label="真实姓名">
    <el-input v-model="addObj.realname"></el-input>
  </el-form-item>
   <el-form-item label="联系方式">
    <el-input v-model="addObj.telephone"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button>取消</el-button>
    <el-button type="primary" @click="onSubmit">立即添加</el-button>
    
  </el-form-item>
</el-form>
</div>

</template>

<script>
import breadcrumb from '../../components/breadcrumbs.vue'
import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('userModule')
export default {
    data(){
        return {
          addObj:{account:'',password:'',realname:'',telephone:''},
        }
    },
    computed:{
        
    },
    methods:{
        ...mapActions(['addAdmin']),
        async onSubmit() {
            const telReg=/^1[3-9]{1}[0-9]{9}$/
        if(this.addObj.account.length<4 ||this.addObj.password.length<4){
            alert('账户或密码请输入至少4为字符')
            return
        }
        if(!telReg.test(this.addObj.telephone)){
            alert('请输入正确的手机号')
            return
        }
        if(this.addObj.account.length<2){
            alert('请输入真实姓名')
            return
        }
        let res=await this.addAdmin(this.addObj)
        if(res.data.code==200){
            // alert('添加成功')
            this.$router.push('/home/user')
        }else{
          // alert('添加失败')
        }
      }
    },
     components: {
       breadcrumb
    },
}
</script>

<style>

</style>