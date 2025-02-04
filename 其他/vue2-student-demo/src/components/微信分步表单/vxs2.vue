<template>
    <div class="vxs2">
        <input
            type="email"
            name=""
            id=""
            v-model="email"
            placeholder="请输入邮箱"
        />
        <h3>感谢注册，确认邮件已发送至你的注册邮箱:</h3>
        <h3>haibao1024@gmail.com</h3>
        <div class="sty1">请进入邮箱查看邮件，并激活微信开放平台帐号。</div>
        <div class="sty" @click="sonStaPut">登录邮箱</div>
        <div class="sty1">没有收到邮件?</div>
        <ol>
            <li>请检查邮箱地址是否正确，你可以返回<a>重新填写</a></li>
            <li>检查你的邮件垃圾箱</li>
            <li>若仍未收到确认，请尝试<a>重新发送</a></li>
        </ol>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'vxs2',
    methods: {
         sonStaPut() {
            let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if (reg.test(this.email)) {
                this.$emit('parStaPut', 'vxs3')
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
.vxs2 {
    padding-top: 30px;
    width: 500px;
    margin: 0 auto;
    .sty {
        width: 150px;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 10px 20px;
        background-color: rgb(35, 187, 50);
        margin: 20px 0;
    }
    .sty1 {
        color: rgb(148, 151, 151);
    }
    ol {
        margin-left: 30px;
        a {
            color: blue;
        }
    }
}
</style>