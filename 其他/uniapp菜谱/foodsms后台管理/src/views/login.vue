<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                 label-width="100px" class="demo-ruleForm log">
            <!-- <img src=".././assets/logo-250px.png" alt=""> -->
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm.account"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录
                </el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <div class="xlr">
                <router-link to="/reg">没有注册？去注册</router-link>
            </div>
            <div class="xreg">没有注册？去注册</div>
        </el-form>
    </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex"
const { mapActions} = createNamespacedHelpers('userModule')
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                if (this.ruleForm.password !== '') {
                    this.$refs.ruleForm.validateField('password');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length <= 2) {
                callback(new Error('密码至少3位!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                account: '',
                password: '',
                //   age: ''
            },
            rules: {
                account: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }

        }
    },
    methods: {
        ...mapActions(['login','getUserInfo']),
        submitForm(formName) {

            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = await this.login(this.ruleForm)
                    if (!res) {return}
                    const res2=await this.getUserInfo();
                    if(!res2){return}
                    this.$router.replace('/home')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //内容重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },


}
</script>

<style lang="scss" scoped>
.login {
    // background-image: url("./../assets/login-bg.jpg");
    background-position: 40% 70%;
    background-size: 1200px;
    width: 1200px;
    margin: 0 auto;
    height: 500px;
    .log {
        position: relative;
        right: -70%;
        top: 10%;
        width: 270px;
        background-color: #fff;
        padding: 20px 40px 20px 0;
        img {
            width: 200px;
            margin-bottom: 20px;
        }
        input {
            height: 25px;
        }
        /*  .pwd {
            padding-left: 16px;
            margin: 15px 0;
        } */
        .xlr {
            margin-left: 52px;
            a {
                text-decoration: none;
                color: rgba(14, 133, 237, 0.753);
            }
        }
        // .xlog,
        .xreg {
            width: 120px;
            padding: 10px 0;
            margin: 0 auto;
            background-color: rgba(14, 133, 237, 0.753);
            color: #fff;
            font-size: 14px;
            margin-left: 100px;
        }
    }
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
