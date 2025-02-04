<template>
    <div class="vxs3">
        <table>
            <tr>
                <td>真实姓名</td>
                <td>
                    <input type="text" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div class="spin">请填写真实姓名</div>
                </td>
            </tr>
            <tr>
                <td>手机号</td>
                <td>
                    <input type="text" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div class="spin">请填写常用手机号</div>
                </td>
            </tr>
            <tr>
                <td>手机验证码</td>
                <td><input type="text" /><button>获取验证码</button></td>
            </tr>
        </table>
        <div class="over">完成</div>
    </div>
</template>

<script>
export default {
    name: 'vxs3',

}
</script>

<style lang="scss">
.vxs3 {
    width: 500px;
    margin: 0 auto;
    table{
        margin: 20px 0;
        tr{
            td .spin{
                color: rgb(147, 147, 147);
                height: 50px;
            }
            td button{
                margin-left: 20px;
            }
            td:nth-child(1){
                width: 130px;
            }
        }
        

    }
    .over {
        width: 150px;
        margin: 0 auto;
        text-align: center;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: rgb(35, 187, 50);
    }
}
</style>