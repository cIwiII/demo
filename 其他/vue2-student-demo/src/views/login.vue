<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                 label-width="100px" class="demo-ruleForm log">
            <img src=".././assets/logo-250px.png" alt="">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm.username"
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
        <p>测试</p>
        <div>
            <el-row :gutter="80">
                <el-col :span="6">
                    <div class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="6" push="">
                    <div class="grid-content bg-purple">2</div>
                </el-col>
                <el-col :span="6" pull="">
                    <div class="grid-content bg-purple">3</div>
                </el-col>
                <el-col :span="6"  :tag="span">
                    <div class="grid-content bg-purple">4</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex"
const { mapActions, mapState } = createNamespacedHelpers('userInfoModul')
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
                username: '',
                password: '',
                //   age: ''
            },
            rules: {
                username: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }

        }
    },
    methods: {
        ...mapActions(['getUserInfo']),
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let login1 = await this.$http.user.login(this.ruleForm)
                    console.log(login1)
                    if (login1.code == 1) {
                        this.$message.success(login1.message)
                        sessionStorage.setItem('token', login1.token);
                        // sessionStorage.setItem('username', this.ruleForm.username);
                        // sessionStorage.setItem('auth', this.ruleForm.auth);
                        this.getUserInfo();
                        this.$router.replace('/home')
                    } else {
                        this.$message.error('登陆失败')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },


}
</script>

<style lang="scss" scoped>
.login {
    background-image: url("./../assets/login-bg.jpg");
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
