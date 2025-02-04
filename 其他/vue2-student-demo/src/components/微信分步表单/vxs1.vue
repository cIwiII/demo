<template>
    <div class="vxs1">
        <form action="">
            <table>
                <tr>
                    <td>邮箱</td>
                    <td>
                        <input
                            type="email"
                            name=""
                            id=""
                            v-model="email"
                            placeholder="请输入邮箱"
                        />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="cogey">
                        作为登录帐号，请填写未被微信开放平台注册、未被微信公众平台注册、未被微信私人帐号绑定的邮箱
                    </td>
                </tr>
                <tr>
                    <td>密码</td>
                    <td>
                        <input
                            type="password"
                            name=""
                            id=""
                            placeholder="请输入密码"
                        />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="cogey">
                        字母、数字或者英文符号，最短6位，区分大小写
                    </td>
                </tr>
                <tr>
                    <td>再次输入密码</td>
                    <td>
                        <input
                            type="password"
                            name=""
                            id=""
                            placeholder="请输入密码"
                        />
                    </td>
                </tr>
                <tr>
                    <td>验证码</td>
                    <td class="dis">
                        <input type="text" placeholder="请输入验证码" />
                        <div>验证码1234</div>
                    </td>
                </tr>
            </table>
        </form>
        <div class="next" v-on:click="sonStaPut">下一步</div>
    </div>
</template>

<script>
export default {
    name: 'vxs1',
    methods: {
        sonStaPut() {
            let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if (reg.test(this.email)) {
                this.$emit('parStaPut', 'vxs2')
            }
            else{
                alert('请输入正确都邮箱格式')
            }

        }
    },
    data() {
        return {
            email: ''
        }
    }

}
</script>

<style lang="scss">
.vxs1 {
    width: 500px;
    margin: 0 auto;
    form {
        border-bottom: 1px solid grey;
        table {
            margin: 20px 0;
            tr {
                line-height: 2;
                td:nth-child(1) {
                    width: 130px;
                }
                .cogey {
                    color: rgb(164, 161, 161);
                    font-size: 14px;
                }
                .dis {
                    display: flex;
                    input {
                        margin-right: 10px;
                    }
                }
            }
        }
    }

    .next {
        padding: 10px 20px;
        width: 200px;
        text-align: center;
        margin: 15px auto;
        background-color: rgb(35, 187, 50);
        border-radius: 5px;
    }
}
</style>